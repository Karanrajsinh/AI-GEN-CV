"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { useResumeInfo } from '@/src/context/ResumeInfoContext';
import { SampleDatePicker } from '../CustomDatePicker';
import RichTextJoditEditor from '../RichTextJoditEditor';
import { Project } from '@/src/Types/ResumeTypes';
import { MdOutlineEditNote } from 'react-icons/md';
import { useForm } from 'react-hook-form';

// Define the main component that now accepts a single project via props
type ProjectProps = {
    actionType: 'add' | 'edit';
    projectData: Project;
    index: number;
    closeModal: () => void;
};

function ProjectForm({ actionType, projectData, index, closeModal }: ProjectProps) {
    const { setResumeInfo } = useResumeInfo();
    const [summary, setSummary] = useState(projectData.description);
    const [skillPrompt, setSkillPrompt] = useState(projectData.skillPrompt);
    const [rolePrompt, setRolePrompt] = useState(projectData.rolePrompt);
    const [promptMessage, setPromptMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [project, setProject] = useState(projectData);
    const [startDate, setStartDate] = useState<Date | string>(project.startDate);
    const [endDate, setEndDate] = useState<Date | string>(project.endDate);


    const [editedFields, setEditedFields] = useState<{ [key: string]: string }>({});


    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: project,
    });


    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;

        if (name === "skillPrompt") {
            setSkillPrompt(value);
        }

        if (name === "rolePrompt") {
            setRolePrompt(value);
        }


        // Update the project state with the new value
        setProject((prevProject) => ({ ...prevProject, [name]: value }));

        // Track the edited fields
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
                projects: prevResumeInfo.projects.map((proj, i) =>
                    i === index ? { ...proj, ...editedFields, currentlyWorking: project.currentlyWorking, description: summary, startDate: startDate, endDate: endDate } : proj
                ),
            }));
        }

        else if (actionType === 'add') {
            setResumeInfo((prevResumeInfo) =>
            (
                {
                    ...prevResumeInfo,
                    projects: [...prevResumeInfo.projects, project]
                }
            ))
        }

        // Reset the editedFields after saving
        setEditedFields({});
        closeModal();
    };


    const handleCurrentlyWorkingToggle = (checked: boolean) => {
        setProject({
            ...project,
            currentlyWorking: checked,
        });
    };


    return (
        <form onSubmit={handleSubmit(onSave)} className='py-4 px-1 lg:py-5 lg:px-5 h-[80vh] flex flex-col justify-start  overflow-y-scroll custom-scrollbar lg:w-[800px]'>
            <div className=' items-center flex ml-4 gap-3 font-semibold'><MdOutlineEditNote className='text-2xl' /><span>Edit Project</span></div>
            <div className='grid grid-cols-2 text-xs sm:text-sm gap-3 p-3 my-5 rounded-lg'>
                <div className='col-span-2'>
                    <label>Project Name</label>
                    <Input
                        className='mt-1'
                        {...register("name", {
                            required: "Field Cannot Be Empty",
                            onChange(event) {
                                handleChange(event)
                            },
                        })}
                        defaultValue={project?.name}
                    />
                    {errors.name && (
                        <p className="text-cyan-500 text-xs mt-1">{errors.name.message}</p>
                    )}
                </div>
                <div>
                    <label>Start Date</label>
                    <SampleDatePicker
                        currentlyWorking={project.currentlyWorking}
                        fieldValue={startDate}
                        fieldName="startDate"
                        setFieldValue={setStartDate}
                    />
                </div>
                <div>
                    <label>End Date</label>
                    <SampleDatePicker
                        currentlyWorking={project.currentlyWorking}
                        fieldValue={endDate}
                        fieldName="endDate"
                        setFieldValue={setEndDate}
                    />
                    <div className='mt-6 ml-2 flex justify-start items-center'>
                        <Checkbox
                            className='border data-[state=checked]:bg-cyan-600 border-cyan-800'
                            checked={project?.currentlyWorking ?? false}
                            onCheckedChange={handleCurrentlyWorkingToggle}
                            id="currently-working"
                        />
                        <label htmlFor="currently-working" className='ml-2 '>
                            Currently Working
                        </label>
                    </div>
                </div>
                <div className='col-span-2 mt-2'>
                    <label className=' font-semibold text-cyan-300'>Give The Skills Developed/Applied In Project </label>
                    <Input
                        className='mt-1'
                        name="skillPrompt"
                        onChange={handleChange}
                        defaultValue={project?.skillPrompt}
                    />
                    {(promptMessage.length > 0 && skillPrompt.length < 1) && <p className='text-cyan-200 text-xs mt-1'>{promptMessage}</p>}

                </div>
                <div className='col-span-2 mt-3'>
                    <label className=' font-semibold text-cyan-300'>Describe The Implementation Of The Project </label>
                    <Input
                        className='mt-1'
                        name="rolePrompt"
                        onChange={handleChange}
                        defaultValue={project?.rolePrompt}
                    />
                    {(promptMessage.length > 0 && skillPrompt.length < 1) && <p className='text-cyan-200 text-xs mt-1'>{promptMessage}</p>}

                </div>
                <div className='col-span-2'>
                    <RichTextJoditEditor setLoadingData={setLoading} projectData={project} skillPrompt={skillPrompt} rolePrompt={rolePrompt} contentType='projects' setSummary={setSummary} setMessagePrompt={setPromptMessage} defaultValue={summary ?? ""} />
                </div>
            </div>

            <div className='flex justify-end gap-6 mr-1 mt-6'>
                <Button disabled={loading} onClick={closeModal}>
                    Cancel
                </Button>
                <Button type='submit' className='bg-cyan-500  hover:bg-cyan-500 hover:bg-opacity-80 text-slate-950' disabled={loading}  >
                    {actionType === 'add' ? 'Create' : 'Save'}
                </Button>
            </div>
        </form>
    );
}

export default ProjectForm;
