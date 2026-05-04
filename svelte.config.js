import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// O adapter-auto detecta automaticamente que você está na Vercel
		adapter: adapter()
	}
};

export default config;