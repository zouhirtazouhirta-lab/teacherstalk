/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#e31919",
          deep: "#900c0c",
          ink: "#171717",
          warm: "#fff8f3",
          mist: "#f5f5f5"
        }
      },
      boxShadow: {
        premium: "0 28px 90px rgba(23, 23, 23, 0.12)",
        glow: "0 22px 70px rgba(227, 25, 25, 0.26)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "Arial", "sans-serif"]
      },
      backgroundImage: {
        "radial-red": "radial-gradient(circle at center, rgba(227,25,25,.18), transparent 52%)"
      }
    }
  },
  plugins: []
};
