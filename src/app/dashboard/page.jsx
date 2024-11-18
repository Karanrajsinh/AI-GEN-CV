import { getUserResumes } from "@/services/supabase";
import ResumeList from "@/src/components/ResumeList";

import { createClient } from "@/utils/supabase/server"
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function ResumeListPage() {

    const supabase = createClient();

    const { data } = await supabase.auth.getUser()


    const resumes = await getUserResumes(data.user.id)



    return (
        <ResumeList userResumes={resumes || []} />
    )
} 