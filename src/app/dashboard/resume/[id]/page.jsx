
import { getResumeData, getResumeName } from "@/services/supabase"
import ResumeMain from "@/src/components/ResumeMain";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function generateMetadata({ params }) {
    try {
        const { resume_name } = await getResumeName(params.id)
        if (resume_name)
            return { title: `${resume_name}` }
        else
            return { title: 'Resume' }
    } catch (error) {
        if (error) return { title: 'Resume' }
    }


}



export default async function ResumePage({ params }) {

    const supabase = createClient()

    const { data } = await supabase.auth.getUser();
    const user = {
        img: data.user.user_metadata.picture,
    }
    const resumeData = await getResumeData(params.id, data.user.id)

    if (!resumeData) redirect('/dashboard')

    return (
        <ResumeMain resumeData={resumeData} user={user} />
    )
}

