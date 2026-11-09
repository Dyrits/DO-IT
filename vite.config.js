import process from 'node:process';
import adapter from '@sveltejs/adapter-auto';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
export default defineConfig({
  plugins: [sveltekit({ adapter: adapter(), preprocess: vitePreprocess() })],
  server: { hmr: { clientPort: process.env.HMR_HOST ? 443 : 3000,
    host: process.env.HMR_HOST?.substring('https://'.length) || 'localhost' } }
});
