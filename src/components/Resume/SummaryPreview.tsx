import { ResumeInfo } from "@/Types/ResumeTypes";


function SummeryPreview({ resumeInfo }: { resumeInfo: ResumeInfo }) {
    return (
        <>
            <hr className='border-[1.5px] my-2'
                style={{
                    borderColor: resumeInfo?.themeColor
                }} />
            <p className='text-sm mt-5'>
                {resumeInfo?.summary}
            </p>
        </>
    )
}

export default SummeryPreview;
