/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "black": "rgba(22, 22, 22, 1)",
      "white": "#ffffff",
      "sub-black": "rgba(30, 30, 30, 1)",
      "gray": "rgba(110, 120, 131, 1)",
      "brand-yellow": "rgba(233, 158, 36, 1)",
      "brand-light-yellow": "rgba(251, 244, 235, 1)",
      "yellow": "rgba(245, 189, 0, 1)",
      "border-gray": "rgba(119, 119, 119, 0.2)",
      "input-gray": "rgba(119, 119, 119, 0)",
    },
    screens: {
      // 'xs': '340px',
      'sm': '650px',
      'md': '768px',
      'mdxl': '870px',
      'lg': '1024px',
      'xlg': '1200px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      width: {
        "logo-width":"164px",
      },
      colors: {
        teal: {
          800: '#115e59',
          900: '#134e4a',
        },
      },
      height: {
        "logo-height":"53px",
        // "1": "50px",
        "2": "85px",
        "3": "120px",
        "4": "145px",
        "5": "170px",
        "6": "200px",
        "7": "230px",
        "8": "260px",
        '9': '290px',
      },
      fontFamily: {
        pushpennyMedium:["push-penny-medium"],
        pushpennyBook:["push-penny-book"],
        pushpennyBold:["push-penny-bold"],
      },
    },
  },
  plugins: [],
}


