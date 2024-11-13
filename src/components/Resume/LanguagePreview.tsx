import { Language } from "@/src/Types/ResumeTypes";

// Define the type for resumeInfo
type ResumeInfo = {
    themeColor: string;
    languages: Language[]; // Array of Language objects
}

// Define the props type
type LanguagePreviewProps = {
    resumeInfo: ResumeInfo;
};

function LanguagePreview({ resumeInfo }: LanguagePreviewProps) {
    return (
        <div className='my-6'>
            <h2 className='text-center font-bold text-sm mb-2'
                style={{
                    color: resumeInfo?.themeColor
                }}>
                Languages
            </h2>
            <hr style={{
                borderColor: resumeInfo?.themeColor
            }} />

            <div className='mx-auto flex flex-wrap items-center gap-8 w-full justify-start my-4'>
                {resumeInfo?.languages.map((language, index) => (
                    <p key={index} className={`text-sm text-slate-700 leading-[0.5] text-center ${language.isVisible ? 'block' : 'hidden'}`}>
                        <span style={{ color: `${resumeInfo.themeColor}` }}>  {language.name}</span>&nbsp;{language.proficientLevel !== 'None' ? <span className="italic">[{language.proficientLevel}]</span> : ''}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default LanguagePreview;
