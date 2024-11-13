import { Skill } from "@/src/Types/ResumeTypes";
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

            <div className='mx-auto flex flex-wrap  items-center gap-8 w-full  justify-start my-4'>
                {resumeInfo?.skills.map((skill, index) => (
                    <p key={index} className={`text-sm text-slate-700 leading-[0.5] text-center ${skill.isVisible === true ? 'block' : 'hidden'}`}>{skill.name}</p>
                ))}
            </div>
        </div>
    )
}

export default SkillsPreview;
