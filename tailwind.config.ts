import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'neon-move': {
          '0%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(80%, -20%)' },
          '50%': { transform: 'translate(50%, 80%)' },
          '75%': { transform: 'translate(-30%, 50%)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        'bounce-neon': {
          '0%, 100%': { transform: 'translate(0%, 0%)', opacity: '0.8' },
          '25%': { transform: 'translate(25%, -25%)', opacity: '1' },
          '50%': { transform: 'translate(50%, 50%)', opacity: '1' },
          '75%': { transform: 'translate(-25%, 25%)', opacity: '0.9' },
        },
        'bounce-neon-purple': {
          '0%, 100%': { transform: 'translate(-40%, 0%)', opacity: '0.8' },
          '25%': { transform: 'translate(-55%, -30%)', opacity: '1' },
          '50%': { transform: 'translate(-50%, 60%)', opacity: '1' },
          '75%': { transform: 'translate(-45%, 30%)', opacity: '0.9' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'neon-move': 'neon-move 12s ease-in-out infinite',
        'bounce-neon': 'bounce-neon 12s ease-in-out infinite',
        'bounce-neon-purple': 'bounce-neon-purple 18s ease-in-out infinite',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
