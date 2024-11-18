import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code'); // Extract the authorization code from the query parameters

    if (code) {
        const supabase = createClient(); // Create Supabase client
        const { error } = await supabase.auth.exchangeCodeForSession(code); // Exchange code for session

        if (error) {
            console.error('Error exchanging code:', error.message);
            return NextResponse.redirect(`${requestUrl.origin}/login?error=auth_failed`);
        }
    }

    // Redirect to the dashboard after successful authentication
    return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
}
