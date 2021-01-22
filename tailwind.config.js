module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        "11/12": "91%",
        "pc-70": "70%",
      },
      height: {
        "11/12": "91%",
      },
      minHeight: {
        web: "750px",
      },
      colors: {
        // Login colors
        mosque: "#026873",
        "boston-blue": "#339AA6",
        sinbad: "#A9D9D9",
        "black-olive": "#262612",
        "tobacco-brown": "#735A45",
        // Register colors
        "half-baked": "#91B7D9",
        "bondi-blue": "#0396A6",
        keppel: "#41A693",
        jewel: "#107357",
        "new-orleans": "#F2C6A0",
      },
      backgroundImage: {
        login: "url('/src/assets/bg.jpg')",
        register: "url('/src/assets/bg-register.jpg')",
      },
      fontFamily: {
        roboto: "Roboto",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
