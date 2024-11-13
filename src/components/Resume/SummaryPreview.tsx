import { ResumeInfo } from "@/src/Types/ResumeTypes";


function SummeryPreview({ resumeInfo }: { resumeInfo: ResumeInfo }) {
    return (
        <>
            <hr className={`border-[1.5px] my-2 ${(resumeInfo.summaryVisible === true && resumeInfo.summary.length > 0) ? 'block' : 'hidden'}`}
                style={{
                    borderColor: resumeInfo?.themeColor
                }} />
            <p className={`text-sm mt-5 ${resumeInfo.summaryVisible === true ? 'block' : 'hidden'}`}>
                {resumeInfo?.summary}
            </p>
        </>
    )
}

export default SummeryPreview;
