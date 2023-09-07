import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        orange: {
          primary: "#ff7101",
          secondary: "#934000",
        },
        grey: {
          primary: "#E1E1E2",
          secondary: "#C0C1C3",
        },
        red: {
          primary: "#DC3545",
        },
        green: {
          primary: "#23BF08",
        },
        gold: {
          primary: "#BF953F",
          secondary: "#FCF6BA",
        },
        silver: {
          primary: "#BAC7DC",
          secondary: "#fff",
        },
        copper: {
          primary: "#BE7023",
          secondary: "#f2c689",
        },
      },
    },
  },
  plugins: [],
}
export default config
