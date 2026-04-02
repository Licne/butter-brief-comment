/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // 背景
        page: "var(--bg-page)",
        block: "var(--bg-block)",
        card: "var(--bg-card)",
        cardactive: "var(--bg-card-active)",

        btn : {
          primary: "var(--btn-primary)",
          primaryhover: "var(--btn-primary-hover)",
          secondary: "var(--btn-secondary)",
        }
        // 文字
        title: "var(--text-title)",
        body: "var(--text-body)",
        desc: "var(--text-desc)",
        white: "var(--text-white)",

        // 强调色
        highlight: "var(--color-highlight)",
        mauve: "var(--color-mauve)",
        taupe: "var(--color-taupe)",

        // 状态色
        success: "var(--color-success)",
        warn: "var(--color-warn)",
        danger: "var(--color-danger)",

        chart: {
          grid: "var(--chart-grid)",
          tooltip: "var(--chart-tooltip)",
        },

        echart1: "var(--echart-1)",
        echart2: "var(--echart-2)",
        echart3: "var(--echart-3)",
        echart4: "var(--echart-4)",
        echart5: "var(--echart-5)",
      },
    },
  },
  plugins: [],
};
