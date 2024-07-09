/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*html",
    "./*js"
  ],
  theme: {
    extend: {
      textColor: {
        customColor: {
          primary: 'var(--color-primary-text)',
          secondary: 'var(--color-secondary-text)',
        },
      },
      backgroundColor: {
        customColor: {
          body: 'var(--color-body-bg)',
          section: 'var(--color-section-bg)',
          button: 'var(--color-button-bg)',
          'button-hover' : 'var(--color-button-hover)',
        }
      }
    },
  },
  plugins: [],
}

