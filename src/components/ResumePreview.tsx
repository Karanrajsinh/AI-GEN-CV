"use client"
import PersonalDetailPreview from '@/src/components/Resume/PersonalDetailPreview';
import SummeryPreview from '@/src/components/Resume/SummaryPreview';
import ExperiencePreview from '@/src/components/Resume/ExperiencePreview';
import EducationalPreview from '@/src/components/Resume/EducationPreview';
import SkillsPreview from '@/src/components/Resume/SkillsPreview';
import { useResumeInfo } from '../context/ResumeInfoContext';
import ProjectPreview from './Resume/ProjectPreview';
// import { resumeData } from '../data/dummyData';s


function ResumePreview() {

    const { resumeInfo } = useResumeInfo();

    console.log(resumeInfo?.experience)
    return (
        <div id='pdf' className=' bg-white text-black h-min min-w-[756px] max-w-[756px] mr-6 p-14 border-t-[20px]'
            style={{
                borderColor: resumeInfo?.themeColor
            }}>
            {/* Personal Detail  */}
            <PersonalDetailPreview resumeInfo={resumeInfo} />

            {/* Summery */}
            <SummeryPreview resumeInfo={resumeInfo} />
            {/* {<ProjectPreview resumeInfo={resumeInfo} />} */}
            {/* Professional Experience */}
            {resumeInfo?.experience?.length >= 0 && <ExperiencePreview resumeInfo={resumeInfo} />}

            {/* Skills */}

            {resumeInfo?.skills?.length >= 0 && <SkillsPreview resumeInfo={resumeInfo} />}
            {/* Education */}

            {resumeInfo?.education?.length >= 0 && <EducationalPreview resumeInfo={resumeInfo} />}

        </div>
    );
}

export default ResumePreview;
