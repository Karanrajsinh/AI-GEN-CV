"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import { useResumeInfo } from '@/src/context/ResumeInfoContext';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { Edit, LoaderCircle } from 'lucide-react';
import RichTextJoditEditor from '../RichTextJoditEditor';
import { SampleDatePicker } from '@/src/components/date-picker';
import { Checkbox } from '@/components/ui/checkbox';
import type { Experience } from '@/src/Types/ResumeTypes';

// Define the main component that now accepts a single experience via props
type experienceProps =
    {
        experienceData: Experience,
        index: number
    }



function ExperienceDetails({ experienceData, index }: experienceProps) {
    const { resumeInfo, setResumeInfo } = useResumeInfo();
    const params = useParams<{ resumeId: string }>();
    const [loading, setLoading] = useState(false);
    const [experience, setExperience] = useState<Experience>(experienceData);

    useEffect(() => {
        setExperience(experienceData);
    }, [experienceData]);

    // Handle input changes and update experience
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        const updatedExperience = { ...experience, [name]: value };

        setExperience(updatedExperience);
        setResumeInfo((prevResumeInfo) => ({
            ...prevResumeInfo,
            experience: prevResumeInfo.experience.map((exp) =>
                exp.id === updatedExperience.id ? updatedExperience : exp
            ),
        }));
    };



    const handleCurrentlyWorkingToggle = (checked: boolean) => {
        const updatedExperience = {
            ...experience,
            currentlyWorking: checked,
            endDate: checked ? new Date() : experience.endDate, // Clear endDate if "Currently Working" is checked
        };

        setExperience(updatedExperience);
        setResumeInfo((prevResumeInfo) => ({
            ...prevResumeInfo,
            experience: prevResumeInfo.experience.map((exp) =>
                exp.id === updatedExperience.id ? updatedExperience : exp
            ),
        }));
    };

    const onSave = async () => {
        setLoading(true);

        const data = {
            data: {
                Experience: [experience], // Save the single experience
            },
        };

        // try {
        //     await GlobalApi.UpdateResumeDetail(params.resumeId, data);
        //     toast('Details updated!');
        // } catch (error) {
        //     toast.error('Failed to update details!');
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-cyan-800'>
                {/* <h2 className='font-bold text-lg'>Professional Experience</h2> */}
                <div className='text-center flex ml-2 gap-4 font-semibold'><Edit /><span>Edit Experience</span></div>
                <div className='grid grid-cols-2  gap-3  p-3 my-5 rounded-lg'>
                    <div>
                        <label className='text-xs'>Position Title</label>
                        <Input
                            name="title"
                            onChange={handleChange}
                            defaultValue={experience?.title}
                        />
                    </div>
                    <div>
                        <label className='text-xs'>Company Name</label>
                        <Input
                            name="companyName"
                            onChange={handleChange}
                            defaultValue={experience?.companyName}
                        />
                    </div>
                    <div>
                        <label className='text-xs'>City</label>
                        <Input
                            name="city"
                            onChange={handleChange}
                            defaultValue={experience?.city}
                        />
                    </div>
                    <div>
                        <label className='text-xs'>State</label>
                        <Input
                            name="state"
                            onChange={handleChange}
                            defaultValue={experience?.state}
                        />
                    </div>
                    <div>
                        <label className='text-xs'>Start Date</label>
                        <SampleDatePicker
                            index={index}
                            sectionType="experience"
                            defaultValue={experience?.startDate}
                            fieldName="startDate"
                        />
                    </div>
                    <div>
                        <label className='text-xs'>End Date</label>
                        <SampleDatePicker
                            index={index}
                            sectionType="experience"
                            defaultValue={experience?.endDate}
                            fieldName="endDate"
                        />
                        <div className='mt-6 ml-2 flex justify-start items-center'>
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
                    <div className='col-span-2'>
                        <RichTextJoditEditor index={index} defaultValue={experience?.workSummary ?? ""} />
                    </div>
                </div>

                <Button disabled={loading} onClick={onSave}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    );
}

export default ExperienceDetails;
