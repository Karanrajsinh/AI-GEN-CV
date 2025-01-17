"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Education } from '@/src/Types/ResumeTypes';
import { useResumeInfo } from '@/src/context/ResumeInfoContext';
import { SampleDatePicker } from '../CustomDatePicker';
import { MdOutlineEditNote } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { addSectionEntry, editSectionEntry } from '@/src/services/supabase';
import { IoAddSharp } from 'react-icons/io5';



interface EducationFormProps {
    actionType: 'add' | 'edit',
    educationData: Education;
    index: number;
    closeModal: () => void;
}

function EducationForm({ actionType, educationData, index, closeModal }: EducationFormProps) {
    const { resumeInfo, setResumeInfo } = useResumeInfo();
    const [education, setEducation] = useState<Education>(educationData);
    const [startDate, setStartDate] = useState<Date | string>(education.startDate);
    const [endDate, setEndDate] = useState<Date | string>(education.endDate);


    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: education,
    });


    const [editedFields, setEditedFields] = useState<{ [key: string]: string }>({});




    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        // Update the project state with the new value
        setEducation((prevEducation) => ({ ...prevEducation, [name]: value }));

        // Track the edited fields
        setEditedFields((prevFields) => ({
            ...prevFields,
            [name]: value,
        }));
    };

    const onSave = async (data: Education) => {
        try {
            const { id, ...filteredData } = data
            if (actionType === 'edit')  // Update resumeInfo with only the changed fields
            {
                await editSectionEntry('educations', id, { ...filteredData, startDate: startDate, endDate: endDate })
                setResumeInfo((prevResumeInfo) => ({
                    ...prevResumeInfo,
                    education: prevResumeInfo.education.map((exp, i) =>
                        i === index ? { ...exp, ...editedFields, startDate: startDate, endDate: endDate } : exp
                    ),
                }));
            }

            else if (actionType === 'add') {
                const { id } = await addSectionEntry("educations", { ...filteredData, resume_id: resumeInfo.resume_id, startDate: startDate, endDate: endDate })
                setResumeInfo((prevResumeInfo) =>
                (
                    {
                        ...prevResumeInfo,
                        education: [...prevResumeInfo.education, { ...education, id: id, startDate: startDate, endDate: endDate }]
                    }
                ))
            }

            // Reset the editedFields after saving
            setEditedFields({});
            closeModal();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast(`${error.message}`)
        }
    };




    return (
        <form onSubmit={handleSubmit(onSave)} className="lg:p-5 py-4 px-3">
            <div className=' items-center flex ml-4 gap-3 font-semibold'>{actionType === 'edit' ? <MdOutlineEditNote className='text-2xl' /> : <IoAddSharp className="text-2xl" />}<span> {actionType === 'edit' ? "Edit" : "Create"} Education</span></div>
            <div className="grid grid-cols-2 gap-3 p-3 my-5 rounded-lg">
                <div className="col-span-2">
                    <label className='text-xs'>University Name</label>
                    <Input
                        {...register("universityName", {
                            required: "Field Cannot Be Empty",
                            onChange(event) {
                                handleChange(event)
                            },
                        })}
                        defaultValue={education?.universityName}
                    />
                    {errors.universityName && (
                        <p className="text-cyan-500 text-xs mt-1">{errors.universityName.message}</p>
                    )}
                </div>
                <div>
                    <label className='text-xs'>Degree</label>
                    <Input
                        {...register("degree", {
                            required: "Field Cannot Be Empty",
                            onChange(event) {
                                handleChange(event)
                            },
                        })}
                        defaultValue={education?.degree}
                    />
                    {errors.degree && (
                        <p className="text-cyan-500 text-xs mt-1">{errors.degree.message}</p>
                    )}
                </div>
                <div>
                    <label className='text-xs'>Major</label>
                    <Input
                        {...register("major", {
                            required: "Field Cannot Be Empty",
                            onChange(event) {
                                handleChange(event)
                            },
                        })}
                        defaultValue={education?.major}
                    />
                    {errors.major && (
                        <p className="text-cyan-500 text-xs mt-1">{errors.major.message}</p>
                    )}
                </div>
                <div>
                    <label className='text-xs'>Start Date</label>
                    <SampleDatePicker
                        setFieldValue={setStartDate}
                        fieldValue={education?.startDate}
                        fieldName="startDate"
                    />
                </div>
                <div>
                    <label className='text-xs'>End Date</label>
                    <SampleDatePicker
                        setFieldValue={setEndDate}
                        fieldValue={education?.endDate}
                        fieldName="endDate"
                    />
                </div>
            </div>
            <div className='flex justify-end gap-6 mr-1 mt-6'>
                <Button type='button' onClick={closeModal}>
                    Cancel
                </Button>
                <Button type='submit' className='bg-cyan-500 hover:bg-cyan-500 hover:bg-opacity-80  text-slate-950'  >
                    {actionType === "add" ? "Create" : "Save"}
                </Button>
            </div>
        </form>
    );
}

export default EducationForm;
