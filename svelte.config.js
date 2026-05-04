import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// Isso diz ao SvelteKit para se adaptar automaticamente à Vercel
		adapter: adapter()
	}
};

export default config;