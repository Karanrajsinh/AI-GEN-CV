"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { useState } from 'react';
import { MdOutlineEditNote } from "react-icons/md";
import { useResumeInfo } from '../../context/ResumeInfoContext';
import { Language } from '@/src/Types/ResumeTypes';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { addSectionEntry, editSectionEntry } from '@/services/supabase';


type LanguageFormProps = {
    actionType: 'add' | 'edit';
    languageData: Language;
    index: number;
    closeModal: () => void;
};

function LanguageForm({ actionType, languageData, index, closeModal }: LanguageFormProps) {
    const { resumeInfo, setResumeInfo } = useResumeInfo();
    const [language, setLanguage] = useState(languageData);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: language,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLanguage((prevLanguage) => ({ ...prevLanguage, [name]: value }));
    };

    const handleProficiencyChange = (value: string) => {
        setLanguage((prevLanguage) => ({ ...prevLanguage, proficientLevel: value }));
    };

    const onSave = async (data: Language) => {

        const { id, ...filteredData } = data
        try {


            if (actionType === 'edit') {
                await editSectionEntry('languages', id, { ...language })
                setResumeInfo((prevResumeInfo) => ({
                    ...prevResumeInfo,
                    languages: prevResumeInfo.languages.map((lang, i) =>
                        i === index ? { ...lang, ...language } : lang
                    ),
                }));
            } else if (actionType === 'add') {
                const { id } = await addSectionEntry('languages', { ...filteredData, resume_id: resumeInfo.resume_id })

                setResumeInfo((prevResumeInfo) => ({
                    ...prevResumeInfo,
                    languages: [...prevResumeInfo.languages, { ...language, id: id }],
                }));
            }

            closeModal();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast(`${error.message}`)
        }
    };

    return (
        <form onSubmit={handleSubmit(onSave)} className='py-4 px-1 lg:p-5 '>
            <div className='flex items-center ml-4 gap-3 font-semibold'>
                <MdOutlineEditNote className='text-2xl' /><span>{actionType === 'add' ? "Add Language" : "Edit Language"}</span>
            </div>
            <div className='grid grid-cols-2  text-xs sm:text-sm gap-3 p-3 my-5'>
                <div>
                    <label className='text-xs'>Language Name</label>
                    <Input
                        className='mt-1'
                        {...register("name", {
                            required: "Field Cannot Be Empty",
                            onChange(event) {
                                handleChange(event)
                            }
                        })}
                        defaultValue={language?.name}
                    />
                    {errors.name && (
                        <p className="text-cyan-500 text-xs mt-1">{errors.name.message}</p>
                    )}
                </div>
                <div>
                    <label className='text-xs'>Proficiency Level</label>
                    <Select onValueChange={handleProficiencyChange} defaultValue={language?.proficientLevel}>
                        <SelectTrigger className="mt-1 border-cyan-800">
                            <SelectValue placeholder="Select proficiency level" />
                        </SelectTrigger>
                        <SelectContent className='bg-slate-900 text-white  border-cyan-800'>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Conversational">Conversational</SelectItem>
                            <SelectItem value="Fluent">Fluent</SelectItem>
                            <SelectItem value="Native">Native</SelectItem>
                            <SelectItem value="None">None</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className='flex justify-end gap-6 mr-4'>
                <Button type='button' onClick={closeModal}>
                    Cancel
                </Button>
                <Button type="submit" className='bg-cyan-500 hover:bg-cyan-500 hover:bg-opacity-80 text-slate-950'>
                    {actionType === "add" ? "Create" : "Save"}
                </Button>
            </div>
        </form>
    );
}

export default LanguageForm;
