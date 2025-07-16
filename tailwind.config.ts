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
    extend: {
      colors: {
        // Couleurs d'ambassade - Version CSS variables
        embassy: {
          // Bleu principal (#003399)
          blue: {
            50: 'hsl(220, 100%, 97%)',
            100: 'hsl(220, 100%, 92%)',
            200: 'hsl(220, 100%, 84%)',
            300: 'hsl(220, 100%, 72%)',
            400: 'hsl(220, 100%, 58%)',
            500: 'hsl(220, 100%, 45%)',
            600: 'hsl(220, 100%, 30%)', // #003399
            700: 'hsl(220, 100%, 25%)',
            800: 'hsl(220, 100%, 20%)',
            900: 'hsl(220, 100%, 15%)',
            950: 'hsl(220, 100%, 8%)',
          },
          // Rouge/Orange (#fa4c31)
          red: {
            50: 'hsl(10, 95%, 95%)',
            100: 'hsl(10, 95%, 88%)',
            200: 'hsl(10, 95%, 78%)',
            300: 'hsl(10, 95%, 68%)',
            400: 'hsl(10, 95%, 58%)', // #fa4c31
            500: 'hsl(10, 95%, 48%)',
            600: 'hsl(10, 95%, 38%)',
            700: 'hsl(10, 95%, 28%)',
            800: 'hsl(10, 95%, 18%)',
            900: 'hsl(10, 95%, 12%)',
            950: 'hsl(10, 95%, 8%)',
          },
          // Jaune/Or (#fecb00)
          yellow: {
            50: 'hsl(48, 100%, 95%)',
            100: 'hsl(48, 100%, 88%)',
            200: 'hsl(48, 100%, 78%)',
            300: 'hsl(48, 100%, 68%)',
            400: 'hsl(48, 100%, 58%)',
            500: 'hsl(48, 100%, 50%)', // #fecb00
            600: 'hsl(48, 100%, 42%)',
            700: 'hsl(48, 100%, 32%)',
            800: 'hsl(48, 100%, 22%)',
            900: 'hsl(48, 100%, 15%)',
            950: 'hsl(48, 100%, 8%)',
          },
        },
      },
    },
  },
  // Les plugins sont toujours définis ici.
  plugins: [require("tailwindcss-animate"), heroui()],
} satisfies Config

export default config