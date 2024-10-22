import { Skill } from "@/Types/ResumeTypes";
// Define the type for resumeInfo
type ResumeInfo = {
    themeColor: string;
    skills: Skill[]; // Array of Skill objects
}

// Define the props type
type SkillsPreviewProps = {
    resumeInfo: ResumeInfo;
};

function SkillsPreview({ resumeInfo }: SkillsPreviewProps) {
    return (
        <div className='my-6'>
            <h2 className='text-center font-bold text-sm mb-2'
                style={{
                    color: resumeInfo?.themeColor
                }}>
                Skills
            </h2>
            <hr style={{
                borderColor: resumeInfo?.themeColor
            }} />

            <div className='grid grid-cols-4 gap-4 w-full justify-items-center my-4'>
                {resumeInfo?.skills.map((skill, index) => (
                    <h2 key={index} className='text-xs'>{skill.name}</h2>
                ))}
            </div>
        </div>
    )
}

export default SkillsPreview;
