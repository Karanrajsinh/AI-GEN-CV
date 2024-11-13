// Define the type for personal details in resumeInfo
type ResumeInfo = {
    themeColor: string;
    firstName: string;
    lastName: string;
    jobTitle: string;
    address: string;
    phone: string;
    email: string;
}

// Define the props type
type PersonalDetailPreviewProps = {
    resumeInfo: ResumeInfo;
};

function PersonalDetailPreview({ resumeInfo }: PersonalDetailPreviewProps) {
    return (
        <div>
            <h2 className='font-bold text-xl text-center'
                style={{
                    color: resumeInfo?.themeColor
                }}>
                {resumeInfo?.firstName} {resumeInfo?.lastName}
            </h2>

            <h2 className='text-center text-sm font-medium'>
                {resumeInfo?.jobTitle}
            </h2>

            <h2 className='text-center font-normal text-xs'
                style={{
                    color: resumeInfo?.themeColor
                }}>
                {resumeInfo?.address}
            </h2>

            <div className='flex justify-between'>
                <h2 className='font-normal text-xs'
                    style={{
                        color: resumeInfo?.themeColor
                    }}>
                    {resumeInfo?.phone}
                </h2>

                <h2 className='font-normal text-xs'
                    style={{
                        color: resumeInfo?.themeColor
                    }}>
                    {resumeInfo?.email}
                </h2>
            </div>
        </div>
    )
}

export default PersonalDetailPreview;
