import type { Config } from 'tailwindcss';

/**
 * Tailwind CSS configuration for the Next.js web app.
 *
 * Tailwind CSS v4 uses a simplified installation model.  The `content` array
 * tells Tailwind where to look for class names so that it can generate
 * utilities on demand.  You can customize your theme or add plugins here.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './lib/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;