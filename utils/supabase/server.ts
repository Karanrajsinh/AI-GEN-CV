import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
    const cookieStore = cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                // Get all cookies and return as an array of objects
                getAll() {
                    return cookieStore.getAll().map((cookie) => ({
                        name: cookie.name,
                        value: cookie.value,
                    }));
                },

                // Set all cookies from an array of objects
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }: { name: string; value: string; options?: CookieOptions }) => {
                            cookieStore.set(name, value, options);
                        });
                    } catch (error) {
                        console.error('Error in setAll:', error);
                    }
                },
            },
        }
    );
}
