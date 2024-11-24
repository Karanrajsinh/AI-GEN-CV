'use client'

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { addResume, addResumeWithData, duplicateResume, editResume } from "@/services/supabase";
import { sampleData } from "@/src/data/sampleData";
import { Resume } from "@/src/Types/ResumeTypes";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoAddSharp } from "react-icons/io5";
import { MdOutlineEditNote } from "react-icons/md";
import { toast } from "sonner";


type ResumeCardFormProps =
    {
        user_id: string
        actionType: 'add' | 'edit' | 'duplicate'
        name: string,
        email: string
        closeDialog: () => void;
        setResumes: React.Dispatch<React.SetStateAction<Resume[]>>
        resumeData: Resume
    }

function ResumeCardForm({ actionType, closeDialog, setResumes, resumeData, name, email, user_id }: ResumeCardFormProps) {

    const [sampleResume, setSampleResume] = useState(false);
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: resumeData
    });

    const handleResumeToggle = (checked: boolean) => {
        setSampleResume(checked)
    }


    const onSave = async (data: Resume) => {

        try {
            setLoading(true);
            if (actionType === 'edit') {
                await editResume(data.resume_id, { resume_name: data.resume_name })
                setResumes((prevResumes) => (prevResumes.map((resume) => (resume.resume_id === data.resume_id ? { ...resume, resume_name: data.resume_name } : resume))))
            } else if (actionType === 'add') {

                const resume = sampleResume ? await addResumeWithData({ ...sampleData, resume_name: data.resume_name }) : await addResume(data.resume_name, name, email)
                setResumes((prevResumes) => [...prevResumes, resume])
            }
            else if (actionType === 'duplicate') {
                const resume = sampleResume ? await addResumeWithData({ ...sampleData, resume_name: data.resume_name }) : await duplicateResume(data.resume_id, user_id, data.resume_name)
                setResumes((prevResumes) => [...prevResumes, resume])
            }
            setLoading(false)
            closeDialog();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setLoading(false)
            return toast(`${error.message}`)
        }
    };

    return (
        <form onSubmit={handleSubmit(onSave)} className='p-5 '>
            <div className=' items-center flex ml-4 gap-3 font-semibold'>{actionType === 'edit' ? <MdOutlineEditNote className='text-2xl' /> : <IoAddSharp className="text-2xl" />}<span> {actionType === 'edit' ? "Edit" : "Create"} Resume</span></div>
            <div className='grid grid-cols- gap-3 p-3 my-5 rounded-lg'>
                <div className='col-span-2'>
                    <label className='text-sm mb-2'>Name </label>
                    <Input
                        className='mt-2'
                        {...register("resume_name", {
                            required: "Field Cannot Be Empty",
                        })}
                    />
                    {errors.resume_name && (
                        <p className="text-cyan-500 text-xs mt-1">{errors.resume_name.message}</p>
                    )}
                </div>
                <div className='mt-4 ml-2 flex justify-start items-center'>
                    <Checkbox
                        checked={sampleResume}
                        onCheckedChange={handleResumeToggle}
                        className='border data-[state=checked]:bg-cyan-600 border-cyan-800'
                    />
                    <label htmlFor="currently-working" className='ml-2 text-xs'>
                        Sample Resume
                    </label>
                </div>
            </div>

            <div className='flex justify-end gap-6 mr-1 mt-6'>
                <Button disabled={loading} type="button" onClick={closeDialog}>
                    Cancel
                </Button>
                <Button disabled={loading} type="submit" className='bg-cyan-500 hover:bg-cyan-500 hover:bg-opacity-80 text-slate-950' >
                    {actionType === 'edit' ? "Save" : "Create"}
                </Button>
            </div>
        </form >
    );
}

export default ResumeCardForm