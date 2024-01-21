import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        grass: "url('/assets/whackAmole/background.png')",
        bg0: "url('/assets/baggage/background0.png')",
        bg1: "url('/assets/baggage/background1.png')",
        bg2: "url('/assets/baggage/background2.png')",
        bg3: "url('/assets/baggage/background3.png')",
        map0: "url('/assets/route/map0.png')",
        map1: "url('/assets/route/map1.png')",
        map2: "url('/assets/route/map2.png')",
      },
    },
  },
  plugins: [],
};
export default config;
