// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // base: '/astro-scholar/',
  site: 'https://TobiasAlfred.pages.dev',

  adapter: cloudflare(),
});