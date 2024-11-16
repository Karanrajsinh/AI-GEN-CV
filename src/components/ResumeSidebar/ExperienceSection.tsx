'use client'

import { Button } from "@/components/ui/button";
import React from "react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { FaCopy } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { Experience } from "@/src/Types/ResumeTypes";
import { useResumeInfo } from "@/src/context/ResumeInfoContext";
import { experienceDefault } from "@/src/data/initialData";
import { toggleIsSectionVisible, toggleIsVisible } from "@/src/helpers/helper";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { GrPowerReset } from "react-icons/gr";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { RussoOne } from "@/src/app/fonts/font";
import { deleteSection, deleteSectionEntry, editResume, editSectionEntry } from "@/services/supabase";
import { toast } from "sonner";

type ExperienceSectionProps =
    {
        setActionType: React.Dispatch<React.SetStateAction<'add' | 'edit'>>
        setIndex: React.Dispatch<React.SetStateAction<number>>
        setModalType: React.Dispatch<React.SetStateAction<string>>,
        setExperience: React.Dispatch<React.SetStateAction<Experience>>,
        openModal: () => void;
    }


const ExperienceSection = ({ setActionType, setIndex, setExperience, setModalType, openModal }: ExperienceSectionProps) => {

    const { resumeInfo, setResumeInfo } = useResumeInfo();

    const addExperience = () => {
        setIndex(resumeInfo.experience.length)
        setActionType('add')
        setExperience(experienceDefault);
        setModalType('experience');
        openModal();
    };



    const deleteExperience = async (id: string) => {

        try {
            await deleteSectionEntry('experiences', id)

            setResumeInfo((prevResumeInfo) => ({
                ...prevResumeInfo,
                experience: prevResumeInfo.experience.filter((exp) => exp.id !== id),
            }));
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast(`${error.message}`)
        }
    }

    const resetExperienceSection = async () => {

        try {
            await deleteSection('experiences', resumeInfo.resume_id)

            setResumeInfo((prevResumeInfo) => (
                {
                    ...prevResumeInfo,
                    experience: []
                }
            ))
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast(`${error.message}`)
        }
    }

    return (
        resumeInfo.experience.length > 0 ? (<div id="experience" className="sm:p-5 px-3 py-4 ">
            <h2 className=" sm:text-xl flex items-center justify-between font-bold text-white">
                <span className={RussoOne.className}>Experience</span>
                <Popover>
                    <PopoverTrigger className="hover:bg-cyan-300 hover:bg-opacity-20  p-2">
                        <GiHamburgerMenu className=" cursor-pointer text-xl  " />
                    </PopoverTrigger>
                    <PopoverContent className="bg-slate-950 w-36 z-50 border rounded-none mt-3 border-gray-600 text-white p-1">
                        <Button className="flex w-full bg-slate-950 border-none justify-start gap-3 hover:bg-cyan-900 hover:bg-opacity-40 text-cyan-400 " onClick={() => {
                            toggleIsSectionVisible('Experience', setResumeInfo)
                            editResume(resumeInfo.resume_id, { isExperienceVisible: !resumeInfo.isExperienceVisible })
                        }} >{resumeInfo.isExperienceVisible ? <IoEye /> : <IoEyeOff />} <span className="text-white">{resumeInfo.isExperienceVisible ? "Visible" : "Hidden"}</span> </Button>
                        <AlertDialog >
                            <AlertDialogTrigger className="flex w-full bg-slate-950 text-sm items-center border-none justify-start py-2 px-4  gap-3 hover:bg-cyan-900 hover:bg-opacity-40"><GrPowerReset className="text-cyan-400" /><span className="font-normal">Reset</span></AlertDialogTrigger>
                            <AlertDialogContent className="rounded-none border-cyan-800 bg-slate-900 w-[95vw]  text-white">
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription className="text-slate-500">
                                        This action cannot be undone. This will permanently delete all items in this section.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="flex gap-3 mt-3">
                                    <AlertDialogCancel className="border border-cyan-600  bg-transparent hover:text-current hover:bg-cyan-800 hover:bg-opacity-40">Cancel</AlertDialogCancel>
                                    <AlertDialogAction className="bg-cyan-500 text-slate-950 border-none hover:bg-cyan-500 hover:bg-opacity-100" onClick={resetExperienceSection}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                    </PopoverContent>
                </Popover>
            </h2>
            {resumeInfo.experience.map((exp: Experience, index: number) => (
                <ContextMenu key={exp.id} >
                    <ContextMenuTrigger className={`${(exp.isVisible && resumeInfo.isExperienceVisible) ? 'opacity-100' : "opacity-60"} `}>
                        <div
                            key={index}
                            onClick={() => {
                                setIndex(index);
                                setActionType('edit')
                                setModalType("experience");
                                setExperience(exp);
                                openModal();
                            }}
                            className="mt-5 p-4 flex flex-col gap-2 cursor-pointer bg-slate-900 border border-cyan-800 hover:bg-cyan-600 hover:bg-opacity-30"
                        >
                            <p className="text-xs sm:text-sm font-semibold">{exp.companyName}</p>
                            <p className="text-xs">{exp.title}</p>
                        </div>
                    </ContextMenuTrigger>
                    <ContextMenuContent className="bg-slate-950 rounded-none  border-gray-600 text-white ">
                        <ContextMenuItem className="text-white flex justify-start gap-3 hover:bg-cyan-800 hover:bg-opacity-40" onClick={() => {
                            setIndex(index);
                            setActionType('add');
                            setModalType("experience");
                            setExperience(exp);
                            openModal();
                        }}> <FaCopy /><span>Duplicate</span></ContextMenuItem>
                        <ContextMenuItem className="flex justify-start gap-3 hover:bg-cyan-800 hover:bg-opacity-40" onClick={() => {
                            toggleIsVisible('experience', index, setResumeInfo)
                            editSectionEntry('experiences', exp.id, { isVisible: !exp.isVisible })

                        }} ><TiTick className={`text-lg ${exp.isVisible ? 'visible' : 'invisible'}`} /> <span>Visible</span> </ContextMenuItem>
                        <AlertDialog >
                            <AlertDialogTrigger className="flex w-full bg-slate-950 text-sm items-center border-none justify-start py-2 px-2 text-cyan-400  gap-3 hover:bg-cyan-800 hover:bg-opacity-40"><ImBin2 /> <span>Delete</span></AlertDialogTrigger>
                            <AlertDialogContent className="rounded-none border-cyan-800 bg-slate-900 w-[95vw]  text-white">
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription className="text-slate-500">
                                        This action cannot be undone. This will permanently delete this item from the section
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="flex gap-3 mt-3">
                                    <AlertDialogCancel className="border border-cyan-600  bg-transparent hover:text-current hover:bg-cyan-800 hover:bg-opacity-40">Cancel</AlertDialogCancel>
                                    <AlertDialogAction className="bg-cyan-500 text-slate-950 border-none hover:bg-cyan-500 hover:bg-opacity-100" onClick={() => deleteExperience(exp.id)}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </ContextMenuContent>
                </ContextMenu>
            ))}
            <Button className="mt-5 text-xs  text-white px-4 py-2 float-right" onClick={addExperience}>
                Add Experience
            </Button>
        </div>) :
            (<div id="experience" className="sm:p-5 px-3 py-4 ">
                <h2 className={`${RussoOne.className} sm:text-xl font-bold text-white`}>Experience</h2>
                <div
                    onClick={addExperience}
                    className="mt-5 cursor-pointer p-3 bg-transparent border border-dashed text-center border-cyan-800 hover:bg-cyan-600 hover:bg-opacity-30"
                >
                    <p className="flex items-center justify-center gap-2">
                        <span className="text-2xl md:text-3xl text-cyan-300">+</span>
                        <span className="md:mt-1 text-sm md:text-base">Experience</span>
                    </p>
                </div>
            </div>)
    );
};

export default ExperienceSection