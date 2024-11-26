/** @type {import('tailwindcss').Config} */
import { ColorSchema } from './src/constant'

function withOpacity (variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}-rgb), ${opacityValue})`
    }
    return `var(${variableName})`
  }
}

export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        primary: withOpacity(ColorSchema.PRIMARY),
        secondary: withOpacity(ColorSchema.SECONDARY),
        success: withOpacity(ColorSchema.SUCCESS),
        warning: withOpacity(ColorSchema.WARNING),
        danger: withOpacity(ColorSchema.DANGER),
      }
    }
  },
  plugins: [],
}

