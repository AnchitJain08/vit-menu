module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#000000',
          section: '#1C1C1E',
          header: '#2C2C2E',
          card: '#3A3A3C',
          hover: '#48484A',
          border: '#3A3A3C',
          input: '#2C2C2E',
          modal: '#2C2C2E',
          text: {
            primary: '#FFFFFF',
            secondary: '#EBEBF5',
            tertiary: '#EBEBF5',
            muted: '#98989D'
          }
        }
      }
    },
  },
  plugins: [],
} 