"use client"

import { useEffect, useRef, useState } from 'react';
import { useResumeInfo } from '../context/ResumeInfoContext';
import EducationalPreview from './Resume/EducationPreview';
import ExperiencePreview from './Resume/ExperiencePreview';
import PersonalDetailPreview from './Resume/PersonalDetailPreview';
import ProjectPreview from './Resume/ProjectPreview';
import SkillsPreview from './Resume/SkillsPreview';
import SummeryPreview from './Resume/SummaryPreview';
import CertificatePreview from './Resume/CertificatePreview';
import LanguagePreview from './Resume/LanguagePreview';
import { OpenSans } from '../app/fonts/font';


function ResumeDetails({ id }: { id: string }) {

    const { resumeInfo } = useResumeInfo();

    const pdfRef = useRef<HTMLDivElement>(null);
    const [height, setheight] = useState("auto");

    useEffect(() => {
        // Trigger height expansion/collapse when content changes
        if (pdfRef.current) {
            setheight(`${pdfRef.current.offsetHeight}px`);
        }
    }, [resumeInfo]);


    return (
        <div
            id="pdf-container"
            className="overflow-hidden transition-all duration-500 ease-in-out"
            style={{ height: height }}
        >
            <div
                id={id}
                ref={pdfRef}
                className={`${OpenSans.className} bg-white pointer-events-none text-black min-w-[756px] min-h-[1100px] max-w-[756px] p-14 `}
                style={{
                    borderColor: resumeInfo?.themeColor,
                }}
            >
                {/* Content components */}
                <PersonalDetailPreview resumeInfo={resumeInfo} />
                <SummeryPreview resumeInfo={resumeInfo} />
                {resumeInfo.experience.length > 0 && resumeInfo.isExperienceVisible && (
                    <ExperiencePreview resumeInfo={resumeInfo} />
                )}
                {resumeInfo.projects.length > 0 && resumeInfo.isProjectVisible && (
                    <ProjectPreview resumeInfo={resumeInfo} />
                )}
                {resumeInfo.skills.length > 0 && resumeInfo.isSkillVisible && (
                    <SkillsPreview resumeInfo={resumeInfo} />
                )}
                {resumeInfo.education.length > 0 && resumeInfo.isEducationVisible && (
                    <EducationalPreview resumeInfo={resumeInfo} />
                )}
                {resumeInfo.certificates.length > 0 && resumeInfo.isCertificateVisible && (
                    <CertificatePreview resumeInfo={resumeInfo} />
                )}
                {resumeInfo.languages.length > 0 && resumeInfo.isLanguageVisible && (
                    <LanguagePreview resumeInfo={resumeInfo} />
                )}
            </div>
        </div>
    );

}

export default ResumeDetails;
