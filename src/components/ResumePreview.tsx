"use client"

import { useResumeInfo } from '../context/ResumeInfoContext';
import EducationalPreview from '../components/Resume/EducationPreview';
import ExperiencePreview from '../components/Resume/ExperiencePreview';
import PersonalDetailPreview from '../components/Resume/PersonalDetailPreview';
import ProjectPreview from '../components/Resume/ProjectPreview';
import SkillsPreview from '../components/Resume/SkillsPreview';
import SummeryPreview from '../components/Resume/SummaryPreview';
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
            {<ProjectPreview resumeInfo={resumeInfo} />}
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
