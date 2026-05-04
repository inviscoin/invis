import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // O adapter-auto é o que permite a conexão perfeita com a Vercel
    adapter: adapter() 
  }
};