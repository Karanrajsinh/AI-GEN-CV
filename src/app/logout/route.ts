import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const supabase = createClient();

    await supabase.auth.signOut();


    await supabase.auth.refreshSession()
    const url = new URL("/", request.url);

    const response = NextResponse.redirect(url);


    // Add headers to prevent caching
    response.headers.set("x-middleware-cache", "no-cache");
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response

}