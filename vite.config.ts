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
});
