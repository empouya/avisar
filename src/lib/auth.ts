import { createSupabaseServerClient } from './supabase/server';

export async function requireAdmin() {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
        throw new Error('UNAUTHORIZED');
    }

    return data.user;
}