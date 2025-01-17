"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { MdOutlineEditNote } from "react-icons/md";
import { Checkbox } from '@/components/ui/checkbox';
import { useResumeInfo } from '@/src/context/ResumeInfoContext';
import { SampleDatePicker } from '../CustomDatePicker';
import RichTextJoditEditor from '../RichTextJoditEditor';
import { Experience } from '@/src/Types/ResumeTypes';
import { useForm } from 'react-hook-form';
import { addSectionEntry, editSectionEntry } from '@/src/services/supabase';
import { toast } from 'sonner';
import { IoAddSharp } from 'react-icons/io5';


type ExperienceProps = {
    actionType: 'add' | 'edit';
    experienceData: Experience;
    index: number;
    closeModal: () => void;
};

function ExperienceForm({ actionType, experienceData, index, closeModal }: ExperienceProps) {
    const { resumeInfo, setResumeInfo } = useResumeInfo();
    const [summary, setSummary] = useState(resumeInfo.experience[index]?.description);
    const [loading, setLoading] = useState(false);
    const [experience, setExperience] = useState(experienceData);
    const [skillPrompt, setSkillPrompt] = useState(experienceData.skillPrompt);
    const [rolePrompt, setRolePrompt] = useState(experienceData.rolePrompt);
    const [promptMessage, setPromptMessage] = useState('');
    const [editedFields, setEditedFields] = useState<{ [key: string]: string }>({});
    const [startDate, setStartDate] = useState<Date | string>(experienceData.startDate);
    const [endDate, setEndDate] = useState<Date | string>(experienceData.endDate);
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: experience,
    });




    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;

        if (name === "skillPrompt") {
            setSkillPrompt(value);
        }

        if (name === "rolePrompt") {
            setRolePrompt(value);
        }

        setExperience((prevExperience) => ({ ...prevExperience, [name]: value }));
        setEditedFields((prevFields) => ({
            ...prevFields,
            [name]: value,
        }));

    };

    const onSave = async (data: Experience) => {

        try {
            const { id, ...filteredData } = data


            if (actionType === 'edit') {
                await editSectionEntry('experiences', id, { ...filteredData, description: summary, currentlyWorking: experience.currentlyWorking, startDate: startDate, endDate: endDate })
                setResumeInfo((prevResumeInfo) => ({
                    ...prevResumeInfo,
                    experience: prevResumeInfo.experience.map((exp, i) =>
                        i === index ? { ...exp, ...editedFields, currentlyWorking: experience.currentlyWorking, startDate: startDate, endDate: endDate, description: summary } : exp
                    ),
                }));

            } else if (actionType === 'add') {

                const { id } = await addSectionEntry("experiences", { ...filteredData, startDate: startDate, endDate: endDate, description: summary, resume_id: resumeInfo.resume_id, currentlyWorking: experience.currentlyWorking })
                setResumeInfo((prevResumeInfo) => ({
                    ...prevResumeInfo,
                    experience: [...prevResumeInfo.experience, { ...experience, id: id, startDate: startDate, endDate: endDate, description: summary }],
                }));
            }
            setEditedFields({});
            closeModal();

        }
        catch (error) {
            return toast(`${error}`)
        }
    };

    const handleCurrentlyWorkingToggle = (checked: boolean) => {
        setExperience(
            {
                ...experience,
                currentlyWorking: checked,
            }
        )
    };

    return (
        <form onSubmit={handleSubmit(onSave)} className='py-4 px-1 lg:py-7 lg:px-5 h-[85vh] flex flex-col justify-start  overflow-y-scroll custom-scrollbar  lg:w-[800px]'>
            <div className='items-center flex  ml-4 gap-3 font-semibold'>
                {actionType === 'edit' ? <MdOutlineEditNote className='text-2xl' /> : <IoAddSharp className="text-2xl" />}<span> {actionType === 'edit' ? "Edit" : "Create"} Experience</span>
            </div>
            <div className='grid grid-cols-2 text-xs sm:text-sm gap-3 p-3 my-5 rounded-lg'>
                <div className='col-span-2'>
                    <label className='text-xs'>Position Title</label>
                    <Input
                        className='mt-1'
                        {...register("title", {
                            required: "Field Cannot Be Empty",
                            onChange(event) {
                                handleChange(event)
                            },
                        })}

                        defaultValue={experienceData?.title}
                    />
                    {errors.title && (
                        <p className="text-cyan-500 text-xs mt-1">{errors.title.message}</p>
                    )}
                </div>
                <div>
                    <label className='text-xs'>Company Name</label>
                    <Input
                        className='mt-1'
                        {...register("companyName", {
                            required: "Field Cannot Be Empty",
                            onChange(event) {
                                handleChange(event)
                            }
                        })}
                        defaultValue={experience?.companyName}
                    />
                    {errors.companyName && (
                        <p className="text-cyan-500 text-xs mt-1">{errors.companyName.message}</p>
                    )}
                </div>
                <div>
                    <label className='text-xs'>Location</label>
                    <Input
                        className='mt-1'
                        {...register("location", {
                            onChange(event) {
                                handleChange(event)
                            }
                        })}
                        defaultValue={experience?.location}
                    />
                </div>
                <div>
                    <label className='text-xs'>Start Date</label>
                    <SampleDatePicker
                        currentlyWorking={experience.currentlyWorking}
                        fieldValue={startDate}
                        fieldName="startDate"
                        setFieldValue={setStartDate}
                    />
                </div>
                <div className='modal'>
                    <label className='text-xs'>End Date</label>
                    <SampleDatePicker
                        currentlyWorking={experience.currentlyWorking}
                        fieldValue={endDate}
                        fieldName="endDate"
                        setFieldValue={setEndDate}
                    />
                    <div className='mt-4 ml-2 flex justify-start items-center'>
                        <Checkbox
                            className='border data-[state=checked]:bg-cyan-600 border-cyan-800'
                            checked={experience?.currentlyWorking ?? false}
                            onCheckedChange={handleCurrentlyWorkingToggle}
                            id="currently-working"
                        />
                        <label htmlFor="currently-working" className='ml-2 text-xs'>
                            Currently Working
                        </label>
                    </div>
                </div>
                <div className='col-span-2 mt-2'>
                    <label className='font-semibold text-cyan-400'>Skills Developed/Applied</label>
                    <Input
                        className='mt-1'
                        {...register("skillPrompt", {
                            onChange(event) {
                                handleChange(event)
                            }
                        })}
                        defaultValue={experience?.skillPrompt}
                    />
                    {(promptMessage.length > 0 && skillPrompt.length < 1) && <p className='text-cyan-200 text-xs mt-1'>{promptMessage}</p>}
                </div>
                <div className='col-span-2 mt-3'>
                    <label className='font-semibold text-cyan-400'>Role in the Experience</label>
                    <Input
                        className='mt-1'
                        {...register("rolePrompt", {
                            onChange(event) {
                                handleChange(event)
                            }
                        })}
                        defaultValue={experience?.rolePrompt}
                    />
                    {(promptMessage.length > 0 && rolePrompt.length < 1) && <p className='text-cyan-200 text-xs mt-1'>{promptMessage}</p>}
                </div>
                <div className='col-span-2'>
                    <RichTextJoditEditor setLoadingData={setLoading} experienceData={experience} rolePrompt={rolePrompt} skillPrompt={skillPrompt} setSummary={setSummary} setMessagePrompt={setPromptMessage} contentType='experience' defaultValue={experience?.description ?? ""} />
                </div>
            </div>
            <div className='flex justify-end gap-6 mr-4'>
                <Button type='button' disabled={loading} onClick={closeModal}>
                    Cancel
                </Button>
                <Button type="submit" className='bg-cyan-500 hover:bg-cyan-500 hover:bg-opacity-80 text-slate-950' disabled={loading}>
                    {actionType === "add" ? "Create" : "Save"}
                </Button>
            </div>
        </form>
    );
}

export default ExperienceForm;
