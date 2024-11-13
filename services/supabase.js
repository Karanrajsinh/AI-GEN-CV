import { createClient } from "@supabase/supabase-js";


export const project_url = 'https://airpjuekimkeqwgrlpat.supabase.co';

const anonPublic = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpcnBqdWVraW1rZXF3Z3JscGF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg2Nzk4NzksImV4cCI6MjAzNDI1NTg3OX0.kkdvnz9Gvm3kxPVUQzGbp_o6mSOvvrG_bGFiGYwiam4"

const supabase = createClient(project_url, anonPublic)

export default supabase;