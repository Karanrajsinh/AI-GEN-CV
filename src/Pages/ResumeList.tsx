"use client"


import { RxResume } from "react-icons/rx";
import { RussoOne } from "../app/fonts/font";
import Link from "next/link";
import { GrLogout } from "react-icons/gr";
import ResumeCard from "@/src/components/ResumeCard/ResumeCard";
import AddResumeCard from "../components/ResumeCard/AddResumeCard";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Image from "next/image";
import DefualttUserImg from 'public/user.png'
import { useUserDetails } from "../context/UserContext";
import { useEffect, useState } from "react";
import { Resume } from "../Types/ResumeTypes";

type Props =
    {
        userResumes: Resume[]
    }



export default function ResumeList({ userResumes }: Props) {

    const [resumes, setResumes] = useState<Resume[]>([])

    useEffect(() => {
        if (userResumes) setResumes(userResumes)
    }, [])
    const { userImg, name, ResetUserDetails } = useUserDetails();



    return (
        <div className="h-screen min-w-screen flex flex-col lg:flex-row bg-slate-950">
            <div className="border-r hidden lg:flex text-white  py-8 flex-col items-center justify-between border-cyan-600 h-screen w-1/6">
                <div className="w-[90%] flex  gap-4 flex-col items-center justify-center">
                    <Link href={'/'} className="  hover:bg-cyan-800 hover:bg-opacity-30 p-2 " ><RxResume className="text-cyan-600 text-xl xl:text-3xl" /></Link>
                    <hr className="border-[0.5] border-cyan-900 w-full " />
                </div>
                <div className="w-[90%] flex flex-col gap-4 items-center justify-center">
                    <hr className="border-[0.5] border-cyan-900 w-full " />
                    <Popover>
                        <PopoverTrigger className="flex min-w-full p-2 items-center justify-center gap-4 hover:bg-cyan-800 hover:bg-opacity-40">
                            <Image className="border-[2px] rounded-full border-cyan-500 object-cover" alt="img" src={userImg ? userImg : DefualttUserImg} width={35} height={30} />
                            <span>{name}</span>
                        </PopoverTrigger>
                        <PopoverContent className="bg-slate-95 w-36 mb-2 mr-10  z-50 border  rounded-none  border-gray-600 text-white p-0">
                            <Link href={'/logout'} className={`${RussoOne.className} min-w-full bg-slate-950  transition-all duration-150 ease-in-out transform active:scale-95 flex items-center justify-center gap-4 p-2 border-none  sm:text-base xl:text-lg`} >
                                <span>Logout</span><GrLogout className="text-cyan-300" /></Link>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <div className="lg:hidden border-b border-cyan-600  px-6 py-4 mt-3 flex items-center justify-between ">
                <Link href={'/'} className="  hover:bg-cyan-800 hover:bg-opacity-30 p-2 " ><RxResume className="text-cyan-600 text-3xl" /></Link>
                <Popover>
                    <PopoverTrigger>
                        <Image className="border-[2px] rounded-full border-cyan-500 object-cover" alt="img" src={userImg ? userImg : DefualttUserImg} width={35} height={30} />
                    </PopoverTrigger>
                    <PopoverContent className="bg-slate-95 w-28 mr-5 z-50 border mt-2 rounded-none  border-gray-600 text-white p-0">
                        <Link href={'/logout'} className={`${RussoOne.className} min-w-full bg-slate-950  transition-all duration-150 ease-in-out transform active:scale-95 flex items-center justify-center gap-4 p-2 border-none text-sm  sm:text-base xl:text-lg`} >
                            <span>Logout</span><GrLogout className="text-cyan-300" /></Link>
                    </PopoverContent>
                </Popover>
            </div>
            <div className={`${RussoOne.className} bg-grid-cyan-800/[0.2] text-white h-screen  flex w-full justify-center lg:justify-normal  lg:w-5/6 gap-6 px-10 flex-col`}>

                <p className={` text-xl lg:text-4xl  lg:mt-8 `}>Resumes</p>
                <div className="flex flex-col lg:flex-row gap-10 h-[80vh] lg:h-auto w-full lg:w-[5/6] lg:flex-wrap custom-scrollbar overflow-y-scroll justify-start items-center">
                    <AddResumeCard setResumes={setResumes} />
                    {resumes.map((resume, index) =>
                        <ResumeCard setResumes={setResumes} index={index} id={resume.resume_id} name={resume.resume_name} key={resume.resume_id} />
                    )}
                </div>
            </div>
        </div>
    )
} 