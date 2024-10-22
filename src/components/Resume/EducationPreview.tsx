"use client"
import React from 'react'

import { format } from 'date-fns';
import { Education } from '@/Types/ResumeTypes';


type ResumeInfo = {
    themeColor: string;
    education: Education[]; // Array of Education objects
}

type EducationalPreviewProps = {
    resumeInfo: ResumeInfo;
};


function EducationalPreview({ resumeInfo }: EducationalPreviewProps) {
    return (
        <div className='my-6'>
            <h2 className='text-center font-bold text-sm mb-2'
                style={{
                    color: resumeInfo?.themeColor
                }}
            >Education</h2>
            <hr style={{
                borderColor: resumeInfo?.themeColor
            }} />

            {resumeInfo?.education.map((education, index) => (
                <div key={index} className='my-5'>
                    <h2 className='text-sm font-bold'
                        style={{
                            color: resumeInfo?.themeColor
                        }}
                    >{education.universityName}</h2>
                    <h2 className='text-xs flex justify-between'>{education?.degree} in {education?.major}
                        <span className='font-semibold' style={{ color: resumeInfo?.themeColor }}>{education?.startDate
                            ? format(new Date(education.startDate), 'MMM yyyy')
                            : 'N/A'} - {education?.endDate
                                ? format(new Date(education.endDate), 'MMM yyyy')
                                : 'N/A'}</span>
                    </h2>
                </div>
            ))}

        </div>
    )
}

export default EducationalPreview