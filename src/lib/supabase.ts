import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Validação simples para evitar erro de runtime caso as chaves não estejam configuradas
const isConfigured = supabaseUrl.startsWith('http');

export const supabase = isConfigured
    ? createClient(supabaseUrl, supabaseAnonKey)
    : new Proxy({} as any, {
        get: () => () => ({
            select: () => ({ eq: () => ({ order: () => Promise.resolve({ data: [], error: null }) }) }),
            insert: () => Promise.resolve({ data: null, error: null }),
            update: () => ({ eq: () => Promise.resolve({ data: null, error: null }) }),
            from: () => ({
                select: () => ({ eq: () => ({ order: () => Promise.resolve({ data: [], error: null }) }) }),
                insert: () => Promise.resolve({ data: null, error: null }),
                update: () => ({ eq: () => Promise.resolve({ data: null, error: null }) })
            })
        })
    });
