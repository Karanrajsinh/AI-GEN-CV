
import { getResumeData } from "@/services/supabase"
import ResumeMain from "@/src/components/ResumeMain";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function ResumePage({ params }) {

    const resumeData = await getResumeData(params.id)

    return (
        <ResumeMain resumeData={resumeData} />
    )
}

