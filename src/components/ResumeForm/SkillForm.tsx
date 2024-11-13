"use client"
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Skill } from '@/src/Types/ResumeTypes';
import { MdOutlineEditNote } from 'react-icons/md';
import { useResumeInfo } from '@/src/context/ResumeInfoContext';
import { useForm } from 'react-hook-form';


// Define the type for each skill entry
type SkillsProps =
    {
        index: number,
        actionType: 'add' | 'edit',
        skillsData: Skill,
        closeModal: () => void;
    }


function SkillForm({ index, actionType, skillsData, closeModal }: SkillsProps) {

    const { setResumeInfo } = useResumeInfo();
    const [skill, setSkill] = useState(skillsData)
    const [loading, setLoading] = useState(false);

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

    const onSave = () => {

        if (actionType === 'edit')  // Update resumeInfo with only the changed fields
        {
            setResumeInfo((prevResumeInfo) => ({
                ...prevResumeInfo,
                skills: prevResumeInfo.skills.map((exp, i) =>
                    i === index ? { ...exp, ...editedFields } : exp
                ),
            }));
        }

        else if (actionType === 'add') {
            setResumeInfo((prevResumeInfo) =>
            (
                {
                    ...prevResumeInfo,
                    skills: [...prevResumeInfo.skills, skill]
                }
            ))
        }

        // Reset the editedFields after saving
        setEditedFields({});
        closeModal();
    };

    return (
        <form onSubmit={handleSubmit(onSave)} className='p-5 '>
            <div className=' items-center flex ml-4 gap-3 font-semibold'><MdOutlineEditNote className='text-2xl' /><span>Edit Skill</span></div>
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
                <Button disabled={loading} onClick={closeModal}>
                    Cancel
                </Button>
                <Button type="submit" className='bg-cyan-500 hover:bg-cyan-500 hover:bg-opacity-80 text-slate-950' disabled={loading}>
                    {actionType === "add" ? "Create" : "Save"}
                </Button>
            </div>
        </form>
    );
}

export default SkillForm;


