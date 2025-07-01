import type { Config } from "tailwindcss"
import { heroui } from "@heroui/react";

const config = {
  darkMode: ["class", "media"],

  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './providers/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"

  ],

  // Préfixe pour les classes Tailwind si vous en utilisez un (laissez vide si non)
  prefix: "",

  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {},
  },
  // Les plugins sont toujours définis ici.
  plugins: [require("tailwindcss-animate"), heroui()],
} satisfies Config

export default config