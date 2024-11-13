"use client";
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MdOutlineEditNote } from 'react-icons/md';
import { useResumeInfo } from '@/src/context/ResumeInfoContext';
import { Certificate } from '@/src/Types/ResumeTypes';
import { SampleDatePicker } from '../CustomDatePicker';
import { useForm } from 'react-hook-form';


type CertificateProps = {
    index: number;
    actionType: 'add' | 'edit';
    certificateData: Certificate;
    closeModal: () => void;
};

function CertificateForm({ index, actionType, certificateData, closeModal }: CertificateProps) {
    const { setResumeInfo } = useResumeInfo();
    const [certificate, setCertificate] = useState(certificateData);
    const [loading, setLoading] = useState(false);
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

    const onSave = () => {
        if (actionType === 'edit') {
            setResumeInfo((prevResumeInfo) => ({
                ...prevResumeInfo,
                certificates: prevResumeInfo.certificates.map((cert, i) =>
                    i === index ? { ...cert, ...editedFields, issueDate: issueDate } : cert
                ),
            }));
        } else if (actionType === 'add') {
            setResumeInfo((prevResumeInfo) => ({
                ...prevResumeInfo,
                certificates: [...prevResumeInfo.certificates, certificate],
            }));
        }
        setEditedFields({});
        closeModal();
    };

    return (
        <form onSubmit={handleSubmit(onSave)} className="p-5">
            <div className="items-center flex ml-4 gap-3 font-semibold">
                <MdOutlineEditNote className="text-2xl" />
                <span>{actionType === 'edit' ? 'Edit Certificate' : 'Add Certificate'}</span>
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
                <Button disabled={loading} onClick={closeModal}>
                    Cancel
                </Button>
                <Button type="submit" className='bg-cyan-500 hover:bg-cyan-500 hover:bg-opacity-80 text-slate-950' disabled={loading}>
                    {actionType === "add" ? "Create" : "Save"}
                </Button>
            </div>
        </form >
    );
}

export default CertificateForm;
