"use client";

import { Certificate } from "@/src/Types/ResumeTypes";
import { format } from "date-fns";
import { BiLinkExternal } from "react-icons/bi";


type ResumeInfo = {
    themeColor: string;
    certificates: Certificate[];
}


type CertificatePreviewProps = {
    resumeInfo: ResumeInfo;
};

function CertificatePreview({ resumeInfo }: CertificatePreviewProps) {



    return (
        <div className='my-6'>
            <h2 className='text-center font-bold text-sm mb-2'
                style={{
                    color: resumeInfo?.themeColor
                }}
            >Certificates</h2>
            <hr style={{
                borderColor: resumeInfo?.themeColor
            }} />

            {resumeInfo?.certificates?.map((certificate, index) => (
                <div key={index} className={`my-5 ${certificate.isVisible === true ? 'block' : 'hidden'}`}>
                    <h2 className='text-sm flex items-center gap-1 font-bold'
                        style={{
                            color: resumeInfo?.themeColor
                        }}>{certificate?.name} {certificate.website.length > 0 && <a className="font-normal" href={certificate.website}><BiLinkExternal className="text-base" /></a>}</h2>
                    <h2 className='text-xs flex justify-between'>
                        {certificate?.issuer}
                        <span className="font-semibold" style={{ color: resumeInfo?.themeColor }}>
                            {certificate?.issueDate
                                ? format(new Date(certificate.issueDate), 'MMM yyyy')
                                : 'N/A'}
                        </span>
                    </h2>
                </div>
            ))}
        </div>
    )
}

export default CertificatePreview;
