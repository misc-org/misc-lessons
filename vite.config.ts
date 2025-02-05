import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dns from 'dns';

dns.setDefaultResultOrder('ipv4first')

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		host: true,
		port: 5173
	},
	build: {
		assetsDir: '_app',
		rollupOptions: {
		  output: {
			assetFileNames: (assetInfo) => {
			  return `_app/immutable/assets/${assetInfo.name}`;
			},
			chunkFileNames: '_app/immutable/chunks/[name].[hash].js',
			entryFileNames: '_app/immutable/entry/[name].[hash].js',
		  }
		}
	  }
});
