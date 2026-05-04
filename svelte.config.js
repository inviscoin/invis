import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // Esta linha é o que conecta o código à Vercel
    adapter: adapter() 
  }
};