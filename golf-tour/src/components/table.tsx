"use client";

import { useState, useEffect, useRef } from "react";
import { IoTriangleOutline } from "react-icons/io5";
import { Reorder } from "framer-motion";

interface TableProps {
  header: { value: number; label: string }[];
  data: { nama: string; angkatan: string; skor: number[] }[];
}

function Table({ header, data }: TableProps) {
  const [sortedData, setSortedData] = useState(data.slice(0, 8));
  const [isLoading, setIsLoading] = useState(true);

  const Load = () => {
    const dummy = [1, 2, 3, 4, 5];
    return dummy.map((idx: number) => (
      <tr key={idx} className="h-fit">
        <td
          className="h-auto w-auto align-middle p-2 border-[1px] border-r-0 bg-white border-grey-primary border-l-grey-secondary border-r-grey-secondary"
          colSpan={header.length + 3}
        >
          <div className="h-4 w-full mx-auto animate-pulse bg-grey-secondary"></div>
        </td>
      </tr>
    ));
  };

  let slicing = useRef(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const startIndex = slicing.current % data.length;
      const endIndex = (startIndex + 7) % data.length; // startIndex + {max row shown-1} change based on preferences

      if (startIndex <= endIndex) {
        setSortedData(data.slice(startIndex, endIndex + 1));
      } else {
        setSortedData(
          data.slice(startIndex).concat(data.slice(0, endIndex + 1))
        );
      }
      setIsLoading(false)
      slicing.current = (slicing.current + 1) % data.length;
    }, 2000);

    return () => clearInterval(intervalId); //This is important
  }, [data]);

  //SHUFFLE DATA
  // const [shuffledData, setShuffledData] = useState([...sortedData]);

  // const shuffleData = () => {
  //   const shuffled = [...shuffledData];
  //   for (let i = shuffled.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  //   }
  //   setShuffledData(shuffled);
  // };

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     shuffleData();
  //   }, 5000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [shuffledData]);

  return (
    <>
      <Reorder.Group values={sortedData} onReorder={setSortedData}>
        <table className="min-w-full overflow-visible border-separate border-spacing-y-1">
          <thead>
            <tr className="h-fit">
              <th
                className="border-[1px] border-r-0  border-grey-primary headerTable p-2 bg-white text-black text-center align-middle"
                rowSpan={2}
              >
                #
              </th>
              <th className="border-[1px] border-l-grey-secondary border-r-0 border-grey-primary headerTable p-2 bg-white text-black text-center align-middle">
                HOLE
              </th>
              {header.map((obj, idx: number) => {
                return (
                  <th
                    key={idx}
                    className="h-auto w-auto align-middle text-center headerTable p-2 border-[1px] border-r-0 bg-white text-black border-grey-primary border-l-grey-secondary"
                  >
                    {obj.label}
                  </th>
                );
              })}
              <th
                className="border-[1px] border-r-0  border-grey-primary headerTable p-2 bg-white text-black text-center align-middle"
                rowSpan={2}
              >
                TOTAL
              </th>
            </tr>
            <tr className="h-fit">
              <th className="border-[1px] border-l-grey-secondary border-r-0 border-grey-primary headerTable p-2 bg-white text-black text-center align-middle">
                PAR
              </th>
              {header.map((obj, idx: number) => {
                return (
                  <th
                    key={idx}
                    className="h-auto w-auto align-middle text-center headerTable p-2 border-[1px] border-r-0 bg-white text-black  border-grey-primary border-l-grey-secondary"
                  >
                    {obj.value}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="overflow-visible">
            {isLoading ? (
              <Load />
            ) : sortedData.length > 0 ? (
              sortedData.map((obj: any, idx: number) => {
                let total = 0;
                return (
                  <Reorder.Item
                    value={obj.rank}
                    as="tr"
                    key={idx + slicing.current}
                    className={`${idx == 0 ? "fade-row" : ""} h-fit`}
                  >
                    <td
                      className={`${
                        obj.rank == 1
                          ? "bg-gradient-to-r from-gold-primary to-gold-secondary"
                          : obj.rank == 2
                          ? "bg-gradient-to-r from-silver-primary to-silver-secondary"
                          : obj.rank == 3
                          ? "bg-gradient-to-r from-copper-primary to-copper-secondary"
                          : "bg-white border-[1px] border-r-0 border-grey-primary border-l-grey-secondary"
                      } h-auto w-auto align-middle text-center headerTable p-2 text-black`}
                    >
                      {obj.rank}
                    </td>
                    <td
                      className={`${
                        obj.rank == 1
                          ? "bg-gradient-to-r from-gold-primary to-gold-secondary"
                          : obj.rank == 2
                          ? "bg-gradient-to-r from-silver-primary to-silver-secondary"
                          : obj.rank == 3
                          ? "bg-gradient-to-r from-copper-primary to-copper-secondary"
                          : "bg-white border-[1px] border-r-0 border-grey-primary border-l-grey-secondary"
                      } h-auto w-auto align-middle bodyText p-2 text-black truncate`}
                    >
                      {obj.nama} [{obj.angkatan}]
                    </td>
                    {obj.skor.map((skor: any, idx: number) => {
                      total += skor;
                      return (
                        <td
                          key={idx}
                          className="h-auto w-auto align-middle text-center bodyText p-2 border-[1px] border-r-0 bg-white text-black  border-grey-primary border-l-grey-secondary"
                        >
                          <div
                            className={`${
                              skor == header[idx].value + 1
                                ? "border-[1px] border-red-primary"
                                : skor == header[idx].value + 2
                                ? "border-[1px] border-red-primary before:border-[1px] before:border-red-primary before:h-full before:w-full before:scale-[85%] before:absolute"
                                : skor == header[idx].value - 1 && skor != 0
                                ? "border-[1px] rounded-full border-green-primary"
                                : skor == header[idx].value - 2 && skor != 0
                                ? "border-[1px] rounded-full border-green-primary before:border-[1px] before:border-green-primary before:h-full before:w-full before:scale-90 before:absolute before:rounded-full"
                                : skor <= header[idx].value - 3 && skor != 0
                                ? "border-[1px] rounded-full border-green-primary before:border-[1px] before:border-green-primary before:h-full before:w-full before:scale-90 before:absolute before:rounded-full after:border-[1px] after:border-green-primary after:h-full after:w-full after:scale-75 after:absolute after:rounded-full"
                                : ""
                            } w-[25px] h-[25px] mx-auto flex items-center justify-center shrink-0 relative`}
                          >
                            <div
                              className={`${
                                skor > header[idx].value + 2 ? "" : "hidden"
                              } absolute text-red-600 text-3xl bottom-[1px]`}
                            >
                              <IoTriangleOutline className={"stroke-custom"} />
                            </div>
                            {skor > 0 ? skor : "-"}
                          </div>
                        </td>
                      );
                    })}
                    <td
                      key={idx}
                      className="h-auto w-auto align-middle text-center headerTable p-2 border-[1px] border-r-0 bg-white text-black  border-grey-primary border-l-grey-secondary"
                    >
                      {total}
                    </td>
                  </Reorder.Item>
                );
              })
            ) : (
              <td colSpan={header.length}>
                <p className="text-center text-[20px] py-5">
                  Data tidak ditemukan
                </p>
              </td>
            )}
          </tbody>
        </table>
      </Reorder.Group>
    </>
  );
}

export default Table;
