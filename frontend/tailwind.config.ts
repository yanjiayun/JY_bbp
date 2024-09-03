import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./component/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        "green": "#00a870",
        "aqua": "#004456",
        "orange": "#e36c16",
      },
      spacing:{
        "1%": "1%",
        "10%": "10%",
        "70%": "70%",
      },
    },
  },
  plugins: [],
};
export default config;
