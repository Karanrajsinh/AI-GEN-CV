import { getUserResumes } from "@/src/services/supabase";
import ResumeList from "@/src/components/ResumeList";

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation";
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export const metadata = {
    title: 'Dashboard'
}

export default async function ResumeListPage() {

    const supabase = createClient();

    const { data } = await supabase.auth.getUser()

    if (!data?.user) redirect('/')

    const user = {
        user_id: data.user?.id,
        email: data?.user?.email,
        name: data?.user?.user_metadata.name,
        img: data?.user?.user_metadata.picture,
    }


    const resumes = await getUserResumes(data.user?.id)



    return (
        <ResumeList userResumes={resumes} user={user} />
    )
} 