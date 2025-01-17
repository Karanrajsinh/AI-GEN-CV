"use client"

import { motion } from "framer-motion";
import { RxResume } from "react-icons/rx";
import { RussoOne } from "../app/fonts/font";
import { GrLogout } from "react-icons/gr";
import ResumeCard from "@/src/components/ResumeCard/ResumeCard";
import AddResumeCard from "../components/ResumeCard/AddResumeCard";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Image from "next/image";
import DefualttUserImg from 'public/user.png'
import { useEffect, useState } from "react";
import { Resume } from "../Types/ResumeTypes";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ResumeCardForm from "./ResumeCard/ResumeCardForm";
import { resumeDefault } from "../data/initialData";
import { logout } from "@/src/services/supabase";

type Props =
    {
        userResumes: Resume[]
        user: {
            email: string,
            name: string,
            img: string,
            user_id: string
        }
    }



export default function ResumeList({ userResumes, user }: Props) {

    const [resumes, setResumes] = useState<Resume[]>([])
    const [open, setOpen] = useState(false);

    const [resumeData, setResumeData] = useState(resumeDefault)

    const [actionType, setActionType] = useState<'add' | 'edit' | 'duplicate'>('add');


    const openDialog = () => {
        setOpen(true)
    }
    const closeDialog = () => {
        setOpen(false);
    }

    const { name, img, email, user_id } = user

    useEffect(() => {
        if (userResumes) setResumes(userResumes)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])






    return (
        <>
            <div className="min-h-screen min-w-screen flex flex-col lg:flex-row bg-slate-950">
                <div className="border-r hidden lg:flex text-white  py-8 flex-col items-center justify-between border-cyan-600 h-screen w-1/6">
                    <div className="w-[90%] flex  gap-4 flex-col items-center justify-center">
                        <div className="flex items-center  p-3 gap-3 lg:p-2 lg:text-base xl:text-xl  " ><RxResume className="text-cyan-600 text-2xl" /> <span className={`text-white ${RussoOne.className}`}>AI-GEN CV </span></div>
                        <hr className="border-[0.5] border-cyan-900 w-full " />
                    </div>
                    <div className="w-[90%] flex flex-col gap-4 items-center justify-center">
                        <hr className="border-[0.5] border-cyan-900 w-full " />
                        <Popover>
                            <PopoverTrigger className="flex min-w-full lg:p-1 xl:p-2 items-center justify-center lg:gap-2 xl:gap-4 hover:bg-cyan-800 hover:bg-opacity-40">
                                <Image className="border-[2px] ml-4 rounded-full border-cyan-500 object-cover" alt="img" src={img ? img : DefualttUserImg} width={35} height={30} />
                                <span className="lg:text-sm xl:text-base">{name}</span>
                            </PopoverTrigger>
                            <PopoverContent className="bg-slate-950 w-36 mb-2 mr-10  z-50 border  rounded-none  border-gray-600 text-white p-1">
                                <div onClick={logout} className={`${RussoOne.className} min-w-full cursor-pointer bg-slate-950  transition-all duration-150 ease-in-out transform active:scale-95 flex items-center justify-center gap-4  hover:bg-cyan-950 border-none p-1 sm:text-base xl:text-lg`} >
                                    <span>Logout</span><GrLogout className="text-cyan-300" /></div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div className="lg:hidden border-b border-cyan-600  px-6 py-3 mt-3 flex items-center justify-between ">
                    <div className="flex items-center  p-2 gap-3 " ><RxResume className="text-cyan-600 text-xl mb-1 " /> <span className={`text-white ${RussoOne.className}`}>AI-GEN CV </span></div>
                    <Popover>
                        <PopoverTrigger>
                            <Image className="border-[2px] rounded-full border-cyan-500 object-cover" alt="img" src={img ? img : DefualttUserImg} width={35} height={30} />
                        </PopoverTrigger>
                        <PopoverContent className="bg-slate-95 w-28 mr-5 z-50 border mt-2 rounded-none  border-gray-600 text-white p-0">
                            <div onClick={logout} className={`${RussoOne.className} cursor-pointer min-w-full bg-slate-950  transition-all duration-150 ease-in-out transform active:scale-95 flex items-center justify-center gap-4 p-2 border-none text-sm  sm:text-base xl:text-lg`} >
                                <span>Logout</span><GrLogout className="text-cyan-300" /></div>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className={`${RussoOne.className} bg-grid-cyan-800/[0.2] text-white h-[90vh] lg:h-screen  flex w-full  justify-start lg:justify-normal  lg:w-5/6 gap-6 pt-8 lg:pt-0 px-12 lg:px-10 flex-col`}>

                    <p className={`hidden lg:block text-xl lg:text-3xl xl:text-4xl  lg:mt-8 `}>Resumes</p>
                    <div className="flex flex-col lg:flex-row gap-10 h-[90vh] lg:h-auto w-full lg:w-[5/6] lg:flex-wrap custom-scrollbar overflow-y-scroll justify-start items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{
                                opacity: 1,
                                x: [0, -10, 0, 10, 0]
                            }}
                            transition={{
                                duration: 0.3,
                                ease: "easeOut",
                            }}
                        >
                            <AddResumeCard setResumeData={setResumeData} setActionType={setActionType} openDialog={openDialog} />
                        </motion.div>

                        {/* Animate ResumeCards */}
                        {resumes.map((resume, index) => (
                            <motion.div
                                key={resume.resume_id}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{
                                    opacity: 1,
                                    x: [0, -10, 0, 10, 0]
                                }}
                                transition={{
                                    delay: (index + 1) * 0.1,
                                    duration: 0.3,
                                    ease: "easeOut",
                                }}
                            >
                                <ResumeCard
                                    id={resume.resume_id}
                                    name={resume.resume_name}
                                    openDialog={openDialog}
                                    setResumes={setResumes}
                                    setResumeData={setResumeData}
                                    setActionType={setActionType}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            <Dialog open={open}>

                <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} style={{ borderRadius: "0px" }} className="bg-slate-900 border w-[95vw] min-h-fit sm:h-fit  md:min-w-max  text-white border-cyan-800 m-0 p-0 modal">
                    <ResumeCardForm setResumes={setResumes} actionType={actionType} closeDialog={closeDialog} name={name} email={email} resumeData={resumeData} user_id={user_id} />
                </DialogContent>
            </Dialog>
        </>
    )
} 