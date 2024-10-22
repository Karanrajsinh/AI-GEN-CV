// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { useResumeInfo } from '@/src/context/ResumeInfoContext';
// import { LoaderCircle } from 'lucide-react';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// // import GlobalApi from './../../../../../service/GlobalApi';
// import { toast } from 'sonner';

// const PersonalDetail = () => {
//     const params = useParams<{ resumeId: string }>();
//     const { resumeInfo, setResumeInfo } = useResumeInfo();
//     const [formData, setFormData] = useState<Partial<Record<string, string>> | undefined>(undefined);
//     const [loading, setLoading] = useState<boolean>(false);

//     useEffect(() => {
//         console.log("---", resumeInfo);
//         // Initialize formData with resumeInfo if available
//         if (resumeInfo) {
//             setFormData({
//                 firstName: resumeInfo.firstName,
//                 lastName: resumeInfo.lastName,
//                 jobTitle: resumeInfo.jobTitle,
//                 address: resumeInfo.address,
//                 phone: resumeInfo.phone,
//                 email: resumeInfo.email,
//             });
//         }
//     }, [resumeInfo]);

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;

//         // Update formData with the new value
//         setFormData(prevData => ({
//             ...prevData,
//             [name]: value
//         }));

//         // Update resumeInfo with the new value
//         setResumeInfo({
//             ...resumeInfo,
//             [name]: value
//         });
//     };

//     const onSave = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setLoading(true);

//         const data = {
//             data: formData
//         };

//         // try {
//         //     const resp = await GlobalApi.UpdateResumeDetail(params?.resumeId, data);
//         //     console.log(resp);
//         //     enabledNext(true);
//         //     toast("Details updated");
//         // } catch (error) {
//         //     console.error(error);
//         // } finally {
//         //     setLoading(false);
//         // }
//     };

//     return (
//         <div className=' shadow-lg'>

//             <form onSubmit={onSave}>
//                 <div className='grid grid-cols-2 mt-5 gap-3'>
//                     <div>
//                         <label className='text-sm'>First Name</label>
//                         <Input
//                             name="firstName"
//                             required
//                             defaultValue={resumeInfo?.firstName}
//                             onChange={handleInputChange}
//                         />
//                     </div>
//                     <div>
//                         <label className='text-sm'>Last Name</label>
//                         <Input
//                             name="lastName"
//                             required
//                             defaultValue={resumeInfo?.lastName}
//                             onChange={handleInputChange}
//                         />
//                     </div>
//                     <div className='col-span-2'>
//                         <label className='text-sm'>Job Title</label>
//                         <Input
//                             name="jobTitle"
//                             required
//                             defaultValue={resumeInfo?.jobTitle}
//                             onChange={handleInputChange}
//                         />
//                     </div>
//                     <div className='col-span-2'>
//                         <label className='text-sm'>Address</label>
//                         <Input
//                             name="address"
//                             required
//                             defaultValue={resumeInfo?.address}
//                             onChange={handleInputChange}
//                         />
//                     </div>
//                     <div>
//                         <label className='text-sm'>Phone</label>
//                         <Input
//                             name="phone"
//                             required
//                             defaultValue={resumeInfo?.phone}
//                             onChange={handleInputChange}
//                         />
//                     </div>
//                     <div>
//                         <label className='text-sm'>Email</label>
//                         <Input
//                             name="email"
//                             required
//                             defaultValue={resumeInfo?.email}
//                             onChange={handleInputChange}
//                         />
//                     </div>
//                 </div>
//                 <div className='mt-3 flex justify-end'>
//                     <Button type="submit" disabled={loading}>
//                         {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
//                     </Button>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default PersonalDetail;

"use client"
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { LoaderCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useResumeInfo } from '../../context/ResumeInfoContext';
// import GlobalApi from './../../../../../service/GlobalApi';
// import { toast } from 'sonner';

interface PersonalDetailProps {
    initialData: {
        firstName: string;
        lastName: string;
        jobTitle: string;
        address: string;
        phone: string;
        email: string;
    }; // Prop to receive initial data
}

const PersonalDetail: React.FC<PersonalDetailProps> = ({ initialData }) => {
    const params = useParams<{ resumeId: string }>();
    const { resumeInfo, setResumeInfo } = useResumeInfo();
    const [formData, setFormData] = useState<Partial<Record<string, string>>>(initialData);
    const [loading, setLoading] = useState<boolean>(false);

    // Sync the initial data from props
    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    // Update resume info when formData changes
    useEffect(() => {
        setResumeInfo((prev) => ({
            ...prev,
            ...formData,
        }));
    }, [formData, setResumeInfo]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Update formData with the new value
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const onSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            data: formData
        };

        // Uncomment and implement your API call logic here to save the personal details
        // try {
        //     const resp = await GlobalApi.UpdateResumeDetail(params?.resumeId, data);
        //     console.log(resp);
        //     toast("Details updated");
        // } catch (error) {
        //     console.error(error);
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <div className='w-[500px] p-5'>
            <h2 className='font-bold text-lg'>Personal Details</h2>
            <p>Edit Your Personal Details</p>
            <form onSubmit={onSave}>
                <div className='grid grid-cols-2 mt-5 gap-3'>
                    <div>
                        <label className='text-sm'>First Name</label>
                        <Input
                            name="firstName"
                            required
                            value={formData?.firstName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className='text-sm'>Last Name</label>
                        <Input
                            name="lastName"
                            required
                            value={formData?.lastName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>Job Title</label>
                        <Input
                            name="jobTitle"
                            required
                            value={formData?.jobTitle}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>Address</label>
                        <Input
                            name="address"
                            required
                            value={formData?.address}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className='text-sm'>Phone</label>
                        <Input
                            name="phone"
                            required
                            value={formData?.phone}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className='text-sm'>Email</label>
                        <Input
                            name="email"
                            required
                            value={formData?.email}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className='mt-3 flex justify-end'>
                    <Button type="submit" disabled={loading}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default PersonalDetail;
