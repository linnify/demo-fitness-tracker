/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        xl: '1280px',
        '2xl': '1400px'
      }
    },
    extend: {
      screens: {},
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        bmiLow: '#ED702D',
        // TODO Move the bellow values to global.css
        neutrals: {
          DEFAULT: '#EAECF0'
        },
        neutral: {
          DEFAULT: '#D0D5DD',
          active: '#98A2B3',
          light: '#F2F4F7',

          dark: '#667085',
          'dark-hover': '#475467',
          darker: '#101828'
        },
        kcal: '#243839',
        proteins: '#F0614F',
        carbohydrates: '#55B548',
        fats: '#F0CA00',

        primary: {
          DEFAULT: 'var(--primary)',
          '-hover': 'var(--primary-hover)',
          '-active': 'var(--primary-active)',

          light: 'var(--primary-light)',
          'light-hover': 'var(--primary-light-hover)',
          'light-active': 'var(--primary-light-active)',

          dark: 'var(--primary-dark)',
          'dark-hover': 'var(--primary-dark-hover)',
          'dark-active': 'var(--primary-dark-active)',
          darker: 'var(--primary-darker)',
          foreground: 'var(--primary-foreground)'
        },

        accent: {
          DEFAULT: 'hsl(var(--accent))',
          '-hover': 'hsl(var(--accent-hover))',
          '-active': 'hsl(var(--accent-active))',

          light: 'hsl(var(--accent-light))',
          'light-hover': 'var(--accent-light-hover)',
          'light-active': 'var(--accent-light-active)',

          dark: 'hsl(var(--accent-dark))',
          'dark-hover': 'var(--accent-dark-hover)',
          'dark-active': 'var(--accent-dark-active)',
          darker: 'var(--accent-darker)',
          foreground: 'var(--accent-foreground)'
        },

        success: {
          DEFAULT: 'hsl(var(--success))',
          light: 'hsl(var(--success-light))',
          'dark-hover': 'hsl(var(--success-dark-hover))'
        },

        warning: {
          DEFAULT: '#FF9A4D'
        },

        error: {
          DEFAULT: '#F76969'
        },

        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },

        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },

        // TODO Remove the Card and Popover and use background and foreground
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)'
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)'
        }
      },
      boxShadow: {
        DEFAULT: '0px 4px 12px rgba(0, 0, 0, 0.08)'
      },
      backgroundImage: {
        login: "url('/images/login.png')",
        'login-background': "url('/images/login-background.svg')",
        'home-background': "url('/images/background.png')",
        'info-bmi': "url('/images/info-bmi.png')",
        'info-calories': "url('/images/info-calories.png')",
        'info-macronutrients': "url('/images/info-macronutrients.png')",
        'info-choose-meals': "url('/images/info-choose-meals.png')",
        'recommendation-dialog': "url('/images/recommendation-dialog.png')"
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)'
      },
      // fontFamily: {
      //   sans: ['var(--font-sans)']
      // },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};
