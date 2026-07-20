/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Cairo", "system-ui", "sans-serif"],
        display: ["Alexandria", "Cairo", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#0D0914",
        panel: "#1A1525",
        pearl: "#FDFBFE",
        mist: "#F3F0F8",
        plum: "#4A235A",
        violet: "#8B5CF6",
        deep: "#2E004F",
        gold: "#D4AF37",
        emerald: "#10B981"
      },
      boxShadow: {
        violet: "0 24px 80px rgba(139, 92, 246, .18)"
      }
    }
  },
  plugins: [],
};
