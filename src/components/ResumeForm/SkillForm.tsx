"use client"
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Skill } from '@/src/Types/ResumeTypes';
import { MdOutlineEditNote } from 'react-icons/md';
import { useResumeInfo } from '@/src/context/ResumeInfoContext';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { addSectionEntry, editSectionEntry } from '@/services/supabase';
import { IoAddSharp } from 'react-icons/io5';


type SkillsProps =
    {
        index: number,
        actionType: 'add' | 'edit',
        skillsData: Skill,
        closeModal: () => void;
    }


function SkillForm({ index, actionType, skillsData, closeModal }: SkillsProps) {

    const { resumeInfo, setResumeInfo } = useResumeInfo();
    const [skill, setSkill] = useState(skillsData)

    const [editedFields, setEditedFields] = useState<{ [key: string]: string }>({});

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: skill,
    });


    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setSkill((prevSkill) => ({ ...prevSkill, [name]: value }));

        setEditedFields((prevFields) => ({
            ...prevFields,
            [name]: value,
        }));
    };

    const onSave = async (data: Skill) => {
        try {
            const { id, ...filteredData } = data

            if (actionType === 'edit')  // Update resumeInfo with only the changed fields
            {
                await editSectionEntry('skills', id, { ...filteredData })
                setResumeInfo((prevResumeInfo) => ({
                    ...prevResumeInfo,
                    skills: prevResumeInfo.skills.map((exp, i) =>
                        i === index ? { ...exp, ...editedFields } : exp
                    ),
                }));
            }

            else if (actionType === 'add') {
                const { id } = await addSectionEntry("skills", { ...filteredData, resume_id: resumeInfo.resume_id })
                setResumeInfo((prevResumeInfo) =>
                (
                    {
                        ...prevResumeInfo,
                        skills: [...prevResumeInfo.skills, { ...skill, id: id }]
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
        <form onSubmit={handleSubmit(onSave)} className='p-5 '>
            <div className=' items-center flex ml-4 gap-3 font-semibold'>{actionType === 'edit' ? <MdOutlineEditNote className='text-2xl' /> : <IoAddSharp className="text-2xl" />}<span> {actionType === 'edit' ? "Edit" : "Create"} Skill</span></div>
            <div className='grid grid-cols- gap-3 p-3 my-5 rounded-lg'>
                <div className='col-span-2'>
                    <label className='text-sm mb-2'>Skill </label>
                    <Input
                        className='mt-2'
                        {...register("name", {
                            required: "Field Cannot Be Empty",
                            onChange(event) {
                                handleChange(event)
                            },
                        })}
                        defaultValue={skill?.name}
                    />
                    {errors.name && (
                        <p className="text-cyan-500 text-xs mt-1">{errors.name.message}</p>
                    )}
                </div>
            </div>

            <div className='flex justify-end gap-6 mr-1 mt-6'>
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

export default SkillForm;


