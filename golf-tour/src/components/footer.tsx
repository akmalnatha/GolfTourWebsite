import { useRef } from "react";
import {
  motion,
  useTransform,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";

interface ParallaxProps {
  children: string;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);

  const x = useTransform(baseX, (v) => `${wrap(-47, 105, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax">
      <motion.div className="scroller" style={{ x }}>
        <p className="scrollingText-mobile lg:scrollingText">{children} </p>
      </motion.div>
    </div>
  );
}

function Footer() {
  var today = new Date(),
    time =
      today.getHours().toString().padStart(2, "0") +
      ":" +
      today.getMinutes().toString().padStart(2, "0") +
      ":" +
      today.getSeconds().toString().padStart(2, "0");

  return (
    <>
      <div className="bg-orange-primary h-[60px] flex w-full">
        <div className="hidden lg:flex w-[15%] headerCard border-r-[1px] border-grey-secondary items-center justify-center">
          LOGO
        </div>
        <div className="w-[70%] sm:w-[80%] lg:w-[70%] overflow-hidden my-auto">
          <ParallaxText baseVelocity={-30}>LIVE SCORE</ParallaxText>
        </div>
        <div className="block text-center my-auto lg:my-0 lg:flex lg:flex-col w-[30%] sm:w-[20%] lg:w-[15%] headerCard border-l-[1px] border-grey-secondary lg:items-center lg:justify-center">
          <p className="hidden lg:block bodyText">Last Updated</p>
          <p
            className="scrollingText-mobile lg:scrollingText"
            suppressHydrationWarning
          >
            {time}
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
