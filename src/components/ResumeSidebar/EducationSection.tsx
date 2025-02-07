"use client"

import { Education } from "@/src/Types/ResumeTypes";
import { Button } from "../../../components/ui/button";
import { useResumeInfo } from "@/src/context/ResumeInfoContext";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { FaCopy } from "react-icons/fa";
import { toggleIsSectionVisible, toggleIsVisible } from "@/src/helpers/helper";
import { ImBin2 } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { educationDefault } from "@/src/data/initialData";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { GiHamburgerMenu } from "react-icons/gi";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { GrPowerReset } from "react-icons/gr";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { RussoOne } from "@/src/app/fonts/font";
import { deleteSection, deleteSectionEntry, editResume, editSectionEntry } from "@/src/services/supabase";



type EducationSectionProps =
    {
        setActionType: React.Dispatch<React.SetStateAction<'add' | 'edit'>>
        setIndex: React.Dispatch<React.SetStateAction<number>>
        setModalType: React.Dispatch<React.SetStateAction<string>>,
        setEducation: React.Dispatch<React.SetStateAction<Education>>,
        openModal: () => void;
    }


const EducationSection = ({ setActionType, setIndex, setEducation, setModalType, openModal }: EducationSectionProps) => {

    const { resumeInfo, setResumeInfo } = useResumeInfo();

    const addEducation = () => {
        setIndex(resumeInfo.education.length)
        setActionType('add')
        setEducation(educationDefault);
        setModalType('education');
        openModal();
    };


    const deleteEducation = (id: string) => {

        deleteSectionEntry('educations', id)

        setResumeInfo((prevResumeInfo) => ({
            ...prevResumeInfo,
            education: prevResumeInfo.education.filter((edu) => edu.id !== id),
        }));
    }

    const resetEducationSection = () => {

        deleteSection('educations', resumeInfo.resume_id)

        setResumeInfo((prevResumeInfo) => (
            {
                ...prevResumeInfo,
                education: []
            }
        ))
    }

    return (
        resumeInfo.education.length > 0 ? (<div id="education" className="sm:p-5 px-3 py-4">
            <h2 className="sm:text-xl flex items-center justify-between font-bold text-white">
                <span className={`${RussoOne.className}`}>Education</span>
                <Popover>
                    <PopoverTrigger className="hover:bg-cyan-300 hover:bg-opacity-20 p-2">
                        <GiHamburgerMenu className=" cursor-pointer text-xl  " />
                    </PopoverTrigger>
                    <PopoverContent className="bg-slate-950 w-36 z-50 border rounded-none mt-3 border-gray-600 text-white p-1">
                        <Button className="flex w-full bg-slate-950 border-none justify-start gap-3 hover:bg-cyan-900 hover:bg-opacity-40 text-cyan-400 " onClick={() => {
                            toggleIsSectionVisible('Education', setResumeInfo)
                            editResume(resumeInfo.resume_id, { isEducationVisible: !resumeInfo.isEducationVisible })
                        }} >{resumeInfo.isEducationVisible ? <IoEye /> : <IoEyeOff />} <span className="text-white">{resumeInfo.isEducationVisible ? "Visible" : "Hidden"}</span> </Button>
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
                                    <AlertDialogAction className="bg-cyan-500 text-slate-950 border-none hover:bg-cyan-500 hover:bg-opacity-100" onClick={resetEducationSection}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                    </PopoverContent>
                </Popover>
            </h2>
            {resumeInfo?.education.map((edu: Education, index: number) => (
                <ContextMenu key={edu.id} >
                    <ContextMenuTrigger className={`${(edu.isVisible && resumeInfo.isEducationVisible) ? 'opacity-100' : "opacity-60"} select-none`}>
                        <div
                            key={index}
                            onClick={() => {
                                setIndex(index);
                                setActionType('edit')
                                setModalType("education");
                                setEducation(edu)
                                openModal();
                            }}
                            className="mt-5 p-4 flex flex-col gap-2 cursor-pointer bg-slate-900 border border-cyan-800 hover:bg-cyan-600 hover:bg-opacity-30"
                        >
                            <p className="text-xs sm:text-sm font-semibold">{edu.degree}</p>
                            <p className="text-xs">{edu.major}</p>
                        </div>
                    </ContextMenuTrigger>
                    <ContextMenuContent className="bg-slate-950 rounded-none  border-gray-600 text-white ">
                        <ContextMenuItem className="text-white flex justify-start gap-3 hover:bg-cyan-800 hover:bg-opacity-50" onClick={() => {
                            setIndex(index);
                            setActionType('add')
                            setModalType("education");
                            setEducation(edu)
                            openModal();
                        }}> <FaCopy /><span>Duplicate</span></ContextMenuItem>
                        <ContextMenuItem className="flex justify-start gap-3 hover:bg-cyan-800 hover:bg-opacity-40" onClick={() => {
                            toggleIsVisible('education', index, setResumeInfo);
                            editSectionEntry('educations', edu.id, { isVisible: !edu.isVisible })
                        }} ><TiTick className={`text-lg ${edu.isVisible ? 'visible' : 'invisible'}`} /> <span>Visible</span> </ContextMenuItem>
                        <AlertDialog >
                            <AlertDialogTrigger className="flex w-full bg-slate-950 text-sm items-center border-none justify-start py-2 px-2 text-cyan-400  gap-3 hover:bg-cyan-800 hover:bg-opacity-40"><ImBin2 /> <span>Delete</span></AlertDialogTrigger>
                            <AlertDialogContent className="rounded-none border-cyan-800 bg-slate-900 w-[95vw]  text-white">
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription className="text-slate-500">
                                        This action cannot be undone. This will permanently delete this item
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="flex gap-3 mt-3">
                                    <AlertDialogCancel className="border border-cyan-600  bg-transparent hover:text-current hover:bg-cyan-800 hover:bg-opacity-40">Cancel</AlertDialogCancel>
                                    <AlertDialogAction className="bg-cyan-500 text-slate-950 border-none hover:bg-cyan-500 hover:bg-opacity-100" onClick={() => deleteEducation(edu.id)}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </ContextMenuContent>
                </ContextMenu>
            ))}
            <Button className="mt-5 text-xs float-right  text-white px-4 py-2" onClick={addEducation}>
                Add Education
            </Button>
        </div>) : <div id="education" className="sm:p-5 px-3 py-4 ">
            <h2 className={`${RussoOne.className} sm:text-xl font-bold text-white`}>Education</h2>
            <div
                onClick={addEducation}
                className="mt-5 cursor-pointer p-3 bg-transparent border border-dashed text-center border-cyan-800 hover:bg-cyan-600 hover:bg-opacity-30"
            >
                <p className="flex items-center justify-center gap-2">
                    <span className="text-2xl md:text-3xl text-cyan-300">+</span>
                    <span className="md:mt-1 text-sm md:text-base">Education</span>
                </p>
            </div>
        </div>
    );
};

export default EducationSection