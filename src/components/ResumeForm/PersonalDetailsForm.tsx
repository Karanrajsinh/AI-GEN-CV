"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { useResumeInfo } from '@/src/context/ResumeInfoContext';
import { MdOutlineEditNote } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { editResume } from '@/src/services/supabase';

type PersonalDetailsProps = {
    data: {
        fullName: string
        jobTitle: string;
        address: string;
        phone: string;
        email: string;
    };
    closeModal: () => void

}

const PersonalDetailsForm = ({ data, closeModal }: PersonalDetailsProps) => {
    const { resumeInfo, setResumeInfo } = useResumeInfo();
    const [formData, setFormData] = useState(data);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: formData,
    });





    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Update formData with the new value
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const onSave = async () => {

        try {
            await editResume(resumeInfo.resume_id, { ...formData })
            setResumeInfo((prevResumeInfo) =>
            (
                {
                    ...prevResumeInfo,
                    ...formData
                }
            ))
            closeModal()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast(`${error.message}`)
        }
    };

    return (
        <form onSubmit={handleSubmit(onSave)} className='py-4 px-3 lg:p-5 lg:w-[500px]'>
            <div className=' items-center flex ml-2 gap-3 font-semibold'><MdOutlineEditNote className='text-2xl' /><span>Edit Personal Details</span></div>
            <div className='grid grid-cols-2 mt-5 gap-4'>
                <div className='col-span-2'>
                    <label className='text-sm'>Full Name</label>
                    <Input
                        {...register("fullName", {
                            required: "Field Cannot Be Empty",
                            onChange(event) {
                                handleInputChange(event)
                            },
                        })}
                        value={formData?.fullName}
                    />
                    {errors.fullName && (
                        <p className="text-cyan-500 text-xs mt-1">{errors.fullName.message}</p>
                    )}
                </div>
                <div className='col-span-2'>
                    <label className='text-sm'>Job Title</label>
                    <Input
                        {...register("jobTitle", {
                            required: "Field Cannot Be Empty",
                            onChange(event) {
                                handleInputChange(event)
                            },
                        })}
                        value={formData?.jobTitle}
                    />
                    {errors.jobTitle && (
                        <p className="text-cyan-500 text-xs mt-1">{errors.jobTitle.message}</p>
                    )}
                </div>
                <div className='col-span-2'>
                    <label className='text-sm'>Address</label>
                    <Input
                        {...register("address", {
                            onChange(event) {
                                handleInputChange(event)
                            },
                        })}
                        value={formData?.address}
                    />
                    {errors.address && (
                        <p className="text-cyan-500 text-xs mt-1">{errors.address.message}</p>
                    )}
                </div>
                <div>
                    <label className='text-sm'>Phone</label>
                    <Input
                        {...register("phone", {
                            onChange(event) {
                                handleInputChange(event)
                            },
                        })}
                        value={formData?.phone}
                    />
                    {errors.phone && (
                        <p className="text-cyan-500 text-xs mt-1">{errors.phone.message}</p>
                    )}
                </div>
                <div>
                    <label className='text-sm'>Email</label>
                    <Input
                        {...register("email", {
                            required: "Field Cannot Be Empty",
                            onChange(event) {
                                handleInputChange(event)
                            },
                        })}
                        value={formData?.email}
                    />
                    {errors.email && (
                        <p className="text-cyan-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                </div>
            </div>
            <div className='flex justify-end gap-6 mr-1 mt-6'>
                <Button type='button' onClick={closeModal}>
                    Cancel
                </Button>
                <Button type='submit' className='bg-cyan-500 hover:bg-cyan-500 hover:bg-opacity-80 text-slate-950'  >
                    Save
                </Button>
            </div>
        </form>
    );
};

export default PersonalDetailsForm;
