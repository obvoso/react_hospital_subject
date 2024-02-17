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
      colors: {
        "souvenir-main": "#E6B143",
      },
      backgroundImage: {
        grass: "url('/assets/whackAmole/background.png')",
        conveyor: "url('/assets/baggage/conveyor.png')",
        bg0: "url('/assets/baggage/background0.png')",
        bg1: "url('/assets/baggage/background1.png')",
        bg2: "url('/assets/baggage/background2.png')",
        bg3: "url('/assets/baggage/background3.png')",
        map0: "url('/assets/route/map0.png')",
        map1: "url('/assets/route/map1.png')",
        map2: "url('/assets/route/map2.png')",
        sign: "url('/assets/route/sign.png')",
        bubble: "url('/assets/souvenir/bubble.png')",
        queue: "url('/assets/souvenir/queue.png')",
      },
    },
  },
  plugins: [],
};
export default config;
