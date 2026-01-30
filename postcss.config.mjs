// postcss.config.mjs

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // Tailwind CSS 4 integration
    // autoprefixer: {}, // Adds vendor prefixes for broader browser support
  },
};

export default config;