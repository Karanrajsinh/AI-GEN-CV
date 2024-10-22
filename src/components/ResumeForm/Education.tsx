// "use client"

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { LoaderCircle } from 'lucide-react';
// import { useEffect, useRef, useState } from 'react';
// import { useParams } from 'next/navigation';
// // import GlobalApi from './../../../../../service/GlobalApi';
// import { toast } from 'sonner';
// import { useResumeInfo } from '@/src/context/ResumeInfoContext';
// import { FormEducation } from '@/src/Types/FormTypes';
// import { SampleDatePicker } from '../date-picker';

// // Define types for education entries






// function EducationForm() {
//     const [loading, setLoading] = useState(false);
//     const { resumeInfo, setResumeInfo } = useResumeInfo();

//     const params = useParams();

//     const [educationalList, setEducationalList] = useState<FormEducation[]>([]);
//     const lastEducationalListRef = useRef(educationalList);

//     useEffect(() => {
//         if (resumeInfo.education && JSON.stringify(resumeInfo.education) !== JSON.stringify(educationalList)) {
//             setEducationalList(resumeInfo.education);
//         }/* eslint-disable-next-line */
//     }, [resumeInfo]);

//     const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
//         const newEntries = [...educationalList];
//         const { name, value } = event.target;
//         newEntries[index] = {
//             ...newEntries[index],
//             [name]: value,
//         };
//         setEducationalList(newEntries);
//     };

//     const AddNewEducation = () => {
//         setEducationalList([
//             ...educationalList,
//             {
//                 universityName: '',
//                 degree: '',
//                 major: '',
//                 startDate: new Date().toISOString(),
//                 endDate: new Date().toISOString(),
//             },
//         ]);
//     };

//     const RemoveEducation = () => {
//         setEducationalList((list) => list.slice(0, -1));
//     };

//     const onSave = () => {
//         setLoading(true);
//         const data = {
//             data: {
//                 education: educationalList.map(({ universityName, degree, major, startDate, endDate, }) => ({
//                     universityName,
//                     degree,
//                     major,
//                     startDate,
//                     endDate,
//                 })),
//             },
//         };

//         // GlobalApi.UpdateResumeDetail(params.resumeId, data).then(
//         //     (resp) => {
//         //         console.log(resp);
//         //         setLoading(false);
//         //         toast('Details updated !');
//         //     },
//         //     (error) => {
//         //         setLoading(false);
//         //         toast('Server Error, Please try again!');
//         //     }
//         // );
//     };

//     useEffect(() => {
//         if (JSON.stringify(lastEducationalListRef.current) !== JSON.stringify(educationalList)) {
//             setResumeInfo((prevResumeInfo) => ({
//                 ...prevResumeInfo,
//                 education: educationalList,
//             }));
//             lastEducationalListRef.current = educationalList; // Update the ref
//         }/* eslint-disable-next-line */
//     }, [educationalList]);

//     return (
//         <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
//             <h2 className='font-bold text-lg'>Education</h2>
//             <p>Add Your educational details</p>

//             <div>
//                 {educationalList.map((item, index) => (
//                     <div key={index}>
//                         <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
//                             <div className='col-span-2'>
//                                 <label>University Name</label>
//                                 <Input
//                                     name='universityName'
//                                     onChange={(e) => handleChange(e, index)}
//                                     defaultValue={item?.universityName}
//                                 />
//                             </div>
//                             <div>
//                                 <label>Degree</label>
//                                 <Input name='degree' onChange={(e) => handleChange(e, index)} defaultValue={item?.degree} />
//                             </div>
//                             <div>
//                                 <label>Major</label>
//                                 <Input name='major' onChange={(e) => handleChange(e, index)} defaultValue={item?.major} />
//                             </div>
//                             <div>
//                                 <label>Start Date</label>
//                                 <SampleDatePicker index={index} sectionType='education' fieldName='startDate' defaultValue={item?.startDate} />
//                             </div>
//                             <div>
//                                 <label>End Date</label>
//                                 <SampleDatePicker index={index} sectionType='education' fieldName='endDate' defaultValue={item?.endDate} />
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <div className='flex justify-between'>
//                 <div className='flex gap-2'>
//                     <Button variant='outline' onClick={AddNewEducation} className='text-primary'>
//                         + Add More Education
//                     </Button>
//                     <Button variant='outline' onClick={RemoveEducation} className='text-primary'>
//                         - Remove
//                     </Button>
//                 </div>
//                 <Button disabled={loading} onClick={onSave}>
//                     {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
//                 </Button>
//             </div>
//         </div>
//     );
// }

// export default EducationForm;


"use client";

import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Education } from '@/Types/ResumeTypes';
import { useResumeInfo } from '../../context/ResumeInfoContext';
import { SampleDatePicker } from '../date-picker';
// import GlobalApi from './../../../../../service/GlobalApi';


interface EducationFormProps {
    educationData: Education;
    index: number
}

function EducationForm({ educationData, index }: EducationFormProps) {
    const { setResumeInfo } = useResumeInfo();
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [education, setEducation] = useState<Education>(educationData);

    useEffect(() => {
        setEducation(educationData);
    }, [educationData]);

    // Handle input changes and update education
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        const updatedEducation = { ...education, [name]: value };

        setEducation(updatedEducation);
        setResumeInfo((prevResumeInfo) => ({
            ...prevResumeInfo,
            education: prevResumeInfo.education.map((edu) =>
                edu.id === updatedEducation.id ? updatedEducation : edu
            ),
        }));
    };

    const onSave = async () => {
        setLoading(true);
        const data = {
            data: {
                education: [education], // Save the single education entry
            },
        };

        // try {
        //     await GlobalApi.UpdateResumeDetail(params.resumeId, data);
        //     toast('Details updated!');
        // } catch (error) {
        //     toast.error('Failed to update details!');
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <div className="p-5">
            <h2 className="font-bold text-lg">Edit Education</h2>
            <div className="grid grid-cols-2 gap-3 p-3 my-5 rounded-lg">
                <div className="col-span-2">
                    <label>University Name</label>
                    <Input
                        name="universityName"
                        onChange={handleChange}
                        defaultValue={education?.universityName}
                    />
                </div>
                <div>
                    <label>Degree</label>
                    <Input
                        name="degree"
                        onChange={handleChange}
                        defaultValue={education?.degree}
                    />
                </div>
                <div>
                    <label>Major</label>
                    <Input
                        name="major"
                        onChange={handleChange}
                        defaultValue={education?.major}
                    />
                </div>
                <div>
                    <label>Start Date</label>
                    <SampleDatePicker
                        index={index}
                        sectionType="education"
                        defaultValue={education?.startDate}
                        fieldName="startDate"
                    />
                </div>
                <div>
                    <label>End Date</label>
                    <SampleDatePicker
                        index={index}
                        sectionType="education"
                        defaultValue={education?.endDate}
                        fieldName="endDate"
                    />
                </div>
            </div>

            <Button disabled={loading} onClick={onSave}>
                {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
            </Button>
        </div>
    );
}

export default EducationForm;
