"use client"
import { Experience } from "@/src/Types/ResumeTypes";
import { format } from "date-fns"; // Make sure to import format

// Define the type for resumeInfo
type ResumeInfo = {
    themeColor: string;
    experience: Experience[]; // Array of Experience objects
}

// Define the props type
type ExperiencePreviewProps = {
    resumeInfo: ResumeInfo;
};

function ExperiencePreview({ resumeInfo }: ExperiencePreviewProps) {
    return (
        <div className='my-6'>
            <h2 className='text-center font-bold text-sm mb-2'
                style={{
                    color: resumeInfo?.themeColor
                }}
            >Experience</h2>
            <hr style={{
                borderColor: resumeInfo?.themeColor
            }} />

            {resumeInfo?.experience?.map((experience, index) => (
                <div key={index} className={`my-5 ${experience.isVisible === true ? 'block' : 'hidden'}`}>
                    <h2 className='text-sm flex items-center gap-1 font-bold'
                        style={{
                            color: resumeInfo?.themeColor
                        }}>{experience?.title}</h2>
                    <h2 className='text-xs flex justify-between'>{experience?.companyName},
                        {experience?.location}
                        <span className="font-semibold" style={{ color: resumeInfo?.themeColor }}>
                            {experience?.startDate
                                ? format(new Date(experience.startDate), 'MMM yyyy')
                                : 'N/A'}<span className="mx-1">-</span>
                            {experience?.currentlyWorking
                                ? 'Present'
                                : (experience?.endDate
                                    ? format(new Date(experience.endDate), 'MMM yyyy')
                                    : 'N/A')}
                        </span>
                    </h2>
                    <div className='text-xs my-2' dangerouslySetInnerHTML={{ __html: experience?.description || '' }} />
                </div>
            ))}
        </div>
    )
}

export default ExperiencePreview;
