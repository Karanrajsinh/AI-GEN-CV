"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoaderCircle } from 'lucide-react';
import React, { useState } from 'react';
import { useResumeInfo } from '@/src/context/ResumeInfoContext';
import { MdOutlineEditNote } from 'react-icons/md';
import { useForm } from 'react-hook-form';

type PersonalDetailsProps = {
    data: {
        firstName: string;
        lastName: string;
        jobTitle: string;
        address: string;
        phone: string;
        email: string;
    }; // Prop to receive initial data
    closeModal: () => void

}

const PersonalDetailsForm = ({ data, closeModal }: PersonalDetailsProps) => {
    const { setResumeInfo } = useResumeInfo();
    const [formData, setFormData] = useState(data);
    const [loading, setLoading] = useState<boolean>(false);

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
        setResumeInfo((prevResumeInfo) =>
        (
            {
                ...prevResumeInfo,
                ...formData
            }
        ))
        closeModal()
    };

    return (
        <form onSubmit={handleSubmit(onSave)} className='py-4 px-3 lg:p-5 lg:w-[500px]'>
            <div className=' items-center flex ml-2 gap-3 font-semibold'><MdOutlineEditNote className='text-2xl' /><span>Edit Personal Details</span></div>
            <div className='grid grid-cols-2 mt-5 gap-4'>
                <div>
                    <label className='text-sm'>First Name</label>
                    <Input
                        {...register("firstName", {
                            required: "Field Cannot Be Empty",
                            onChange(event) {
                                handleInputChange(event)
                            },
                        })}
                        value={formData?.firstName}
                    />
                    {errors.firstName && (
                        <p className="text-cyan-500 text-xs mt-1">{errors.firstName.message}</p>
                    )}
                </div>
                <div>
                    <label className='text-sm'>Last Name</label>
                    <Input
                        {...register("lastName", {
                            required: "Field Cannot Be Empty",
                            onChange(event) {
                                handleInputChange(event)
                            },
                        })}
                        value={formData?.lastName}
                    />
                    {errors.lastName && (
                        <p className="text-cyan-500 text-xs mt-1">{errors.lastName.message}</p>
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
                            required: "Field Cannot Be Empty",
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
                            required: "Field Cannot Be Empty",
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
                <Button disabled={loading} onClick={closeModal}>
                    Cancel
                </Button>
                <Button type='submit' className='bg-cyan-500  text-slate-950' disabled={loading} >
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </form>
    );
};

export default PersonalDetailsForm;
