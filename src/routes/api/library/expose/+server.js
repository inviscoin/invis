import { json } from '@sveltejs/kit';

export async function GET({ url, locals: { supabase } }) {
    const category = url.searchParams.get('category') || 'all';
    
    // Consulta otimizada com integridade de link (Status 1)
    let query = supabase
        .from('library_catalog')
        .select('id, title, author, tags, is_neural, min_tier, cover_url')
        .eq('status', 1);

    if (category !== 'all') {
        query = query.contains('tags', [category]);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) return json({ error: error.message }, { status: 500 });

    // Injeção de Proxy Seguro para as capas e arquivos [3, 4]
    const normalizedData = data.map(book => ({
        ...book,
        proxyUrl: `https://inviscore.com/v1/reader/stream/${book.id}`
    }));

    return json(normalizedData);
}