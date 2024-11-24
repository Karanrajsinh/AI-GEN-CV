"use client";
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MdOutlineEditNote } from 'react-icons/md';
import { useResumeInfo } from '@/src/context/ResumeInfoContext';
import { Certificate } from '@/src/Types/ResumeTypes';
import { SampleDatePicker } from '../CustomDatePicker';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { addSectionEntry, editSectionEntry } from '@/services/supabase';
import { IoAddSharp } from 'react-icons/io5';


type CertificateProps = {
    index: number;
    actionType: 'add' | 'edit';
    certificateData: Certificate;
    closeModal: () => void;
};

function CertificateForm({ index, actionType, certificateData, closeModal }: CertificateProps) {
    const { resumeInfo, setResumeInfo } = useResumeInfo();
    const [certificate, setCertificate] = useState(certificateData);
    const [editedFields, setEditedFields] = useState<{ [key: string]: string }>({});
    const [issueDate, setIssueDate] = useState<Date | string>(certificateData.issueDate);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: certificate,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setCertificate((prevCertificate) => ({ ...prevCertificate, [name]: value }));

        setEditedFields((prevFields) => ({
            ...prevFields,
            [name]: value,
        }));
    };

    const onSave = async (data: Certificate) => {
        try {
            const { id, ...filteredData } = data
            if (actionType === 'edit') {

                await editSectionEntry('certificates', id, { ...filteredData, issueDate: issueDate })
                setResumeInfo((prevResumeInfo) => ({
                    ...prevResumeInfo,
                    certificates: prevResumeInfo.certificates.map((cert, i) =>
                        i === index ? { ...cert, ...editedFields, issueDate: issueDate } : cert
                    ),
                }));
            } else if (actionType === 'add') {

                const { id } = await addSectionEntry("certificates", { ...filteredData, issueDate: issueDate, resume_id: resumeInfo.resume_id })
                setResumeInfo((prevResumeInfo) => ({
                    ...prevResumeInfo,
                    certificates: [...prevResumeInfo.certificates, { ...certificate, id: id }],
                }));
            }
            setEditedFields({});
            closeModal();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast(`${error.message}`)
        }
    };

    return (
        <form onSubmit={handleSubmit(onSave)} className="p-5">
            <div className="items-center flex ml-4 gap-3 font-semibold">
                {actionType === 'edit' ? <MdOutlineEditNote className='text-2xl' /> : <IoAddSharp className="text-2xl" />}<span> {actionType === 'edit' ? "Edit" : "Create"} Certificate</span>
            </div>
            <div className="grid grid-cols-2 gap-3 p-3 my-5 rounded-lg">
                <div className='col-span-2'>
                    <label className="text-sm mb-2">Certificate Name</label>
                    <Input
                        className="mt-2"
                        {...register("name", {
                            required: "Field Cannot Be Empty",
                            onChange(event) {
                                handleChange(event)
                            },
                        })}
                        defaultValue={certificate.name}
                    />
                    {errors.name && (
                        <p className="text-cyan-500 text-xs mt-1">{errors.name.message}</p>
                    )}
                </div>
                <div>
                    <label className="text-sm mb-2">Issuer</label>
                    <Input
                        className="mt-2"
                        {...register("issuer", {
                            required: "Field Cannot Be Empty",
                            onChange(event) {
                                handleChange(event)
                            },
                        })}
                        defaultValue={certificate.issuer}
                    />
                    {errors.issuer && (
                        <p className="text-cyan-500 text-xs mt-1">{errors.issuer.message}</p>
                    )}
                </div>
                <div>
                    <label className="text-sm mb-2">Website</label>
                    <Input
                        className="mt-2"
                        {...register("website", {
                            pattern: {
                                value: /^https:\/\/.*/,
                                message: "URL must start with 'https://'",
                            },
                        })}
                        defaultValue={certificate.website}
                    />
                    {errors.website && (
                        <p className="text-cyan-500 text-xs mt-1">{errors.website.message}</p>
                    )}
                </div>
                <div>
                    <label className="text-sm mb-2">Date</label>
                    <SampleDatePicker
                        setFieldValue={setIssueDate}
                        fieldValue={certificate?.issueDate}
                        fieldName="issueDate"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-6 mr-1 mt-6">
                <Button onClick={closeModal}>
                    Cancel
                </Button>
                <Button type="submit" className='bg-cyan-500 hover:bg-cyan-500 hover:bg-opacity-80 text-slate-950' >
                    {actionType === "add" ? "Create" : "Save"}
                </Button>
            </div>
        </form >
    );
}

export default CertificateForm;
