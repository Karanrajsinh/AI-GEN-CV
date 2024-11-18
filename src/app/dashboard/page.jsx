import { getUserResumes } from "@/services/supabase";
import ResumeList from "@/src/Pages/ResumeList"
import { createClient } from "@/utils/supabase/server"
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function ResumeListPage() {

    const supabase = createClient();

    await new Promise((resolve) => setTimeout(resolve, 10000));
    const { data } = await supabase.auth.getUser()


    const resumes = await getUserResumes(data.user.id)



    return (
        <ResumeList userResumes={resumes} />
    )
} 