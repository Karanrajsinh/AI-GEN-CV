"use client"

import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import React, { useEffect, useState } from 'react';
import { Edit, LoaderCircle } from 'lucide-react';
import { Project } from '@/Types/ResumeTypes';
import { Checkbox } from '../../../components/ui/checkbox';
import { useResumeInfo } from '../../context/ResumeInfoContext';
import { SampleDatePicker } from '../date-picker';
import RichTextJoditEditor from '../RichTextJoditEditor';

// Define the main component that now accepts a single project via props
type ProjectProps = {
    projectData: Project;
    index: number;
};

function ProjectDetails({ projectData, index }: ProjectProps) {
    const { setResumeInfo } = useResumeInfo();
    const [loading, setLoading] = useState(false);
    const [project, setProject] = useState(projectData);

    useEffect(() => {
        setProject(projectData);
    }, [projectData]);

    // Handle input changes and update project
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        const updatedProject = { ...project, [name]: value };

        setProject(updatedProject);
        setResumeInfo((prevResumeInfo) => ({
            ...prevResumeInfo,
            projects: prevResumeInfo.projects.map((proj) =>
                proj.id === updatedProject.id ? updatedProject : proj
            ),
        }));
    };

    const handleCurrentlyWorkingToggle = (checked: boolean) => {
        const updatedProject = {
            ...project,
            currentlyWorking: checked,
            endDate: checked ? new Date() : project.endDate, // Clear endDate if "Currently Working" is checked
        };

        setProject(updatedProject);
        setResumeInfo((prevResumeInfo) => ({
            ...prevResumeInfo,
            projects: prevResumeInfo.projects.map((proj) =>
                proj.id === updatedProject.id ? updatedProject : proj
            ),
        }));
    };

    const onSave = async () => {
        setLoading(true);

        const data = {
            data: {
                Project: [project], // Save the single project
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
            <div className='p-5 w-[800px]'>
                <div className='text-center flex ml-2 gap-4 font-semibold'><Edit /><span>Edit Project</span></div>
                <div className='grid grid-cols-2 gap-3 p-3 my-5 rounded-lg'>
                    <div>
                        <label className='text-xs'>Project Name</label>
                        <Input
                            name="name"
                            onChange={handleChange}
                            defaultValue={project?.name}
                        />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-xs'>Description</label>
                        <RichTextJoditEditor contentType='projects' index={index} defaultValue={project?.description ?? ""} />
                    </div>
                    <div>
                        <label className='text-xs'>Start Date</label>
                        <SampleDatePicker
                            index={index}
                            sectionType="projects"
                            defaultValue={project?.startDate}
                            fieldName="startDate"
                        />
                    </div>
                    <div>
                        <label className='text-xs'>End Date</label>
                        <SampleDatePicker
                            index={index}
                            sectionType="projects"
                            defaultValue={project?.endDate}
                            fieldName="endDate"
                        />
                        <div className='mt-6 ml-2 flex justify-start items-center'>
                            <Checkbox
                                className='border data-[state=checked]:bg-cyan-600 border-cyan-800'
                                checked={project?.currentlyWorking ?? false}
                                onCheckedChange={handleCurrentlyWorkingToggle}
                                id="currently-working"
                            />
                            <label htmlFor="currently-working" className='ml-2 text-xs'>
                                Currently Working
                            </label>
                        </div>
                    </div>
                </div>

                <Button disabled={loading} onClick={onSave}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    );
}

export default ProjectDetails;
