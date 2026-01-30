/* DEFAULT CODE HERE COMMENTED OUT */
//import type { NextConfig } from "next";

//const nextConfig: NextConfig = {
//  /* config options here */
//};

//export default nextConfig; */
/* END DEFAULT CODE HERE COMMENTED OUT */

// next.config.ts
import mdx from '@next/mdx';
import UnpluginFonts from 'unplugin-fonts/webpack';

// Enable MDX support with Next.js
const withMDX = mdx({
  extension: /\.mdx?$/, // Support both .md and .mdx files
  options: {
    remarkPlugins: [], // Add remark plugins here if needed
    rehypePlugins: []  // Add rehype plugins here if needed
  }
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Specify file extensions Next.js should recognize
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],

  // Experimental features for Next.js 15.x.x
  experimental: {
    mdxRs: true,         // Use Rust-based MDX compiler for faster builds
    reactCompiler: false  // Integrate React 19 compiler for optimized rendering, but we put false value for the time being.
  },

  // Custom Webpack configuration for advanced use cases
  webpack: (config, { isServer }) => {
    // Add unplugin-fonts to Webpack for Google Fonts integration
    config.plugins.push(
      UnpluginFonts({
        google: {
          families: [
            'Inter:400,700',    // Sleek sans-serif for general text
            'Merriweather:300,400' // Elegant serif for headings
          ]
        }
      })
    );

    // Example: Add custom loader for specific file types (e.g., SVGs)
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'] // Requires `npm install @svgr/webpack` if used
    });

    // Optimize server-side vs client-side builds
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all', // Enable code splitting for better caching
      };
    }

    return config;
  }
};

// Export the configuration with MDX support
export default withMDX(nextConfig);