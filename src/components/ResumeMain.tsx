"use client";
import { Certificate, Education, Experience, Language, PersonalDetails, Project, ResumeInfo, Skill } from "@/src/Types/ResumeTypes";
import { useEffect, useState } from "react";
import ResumePreview from "@/src/components/ResumePreview";
import { Dialog, DialogContent } from "../../components/ui/dialog";
import EducationForm from "@/src/components/ResumeForm/EducationForm";
import ProjectForm from "@/src/components/ResumeForm/ProjectForm";
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet";
import ExperienceForm from "@/src/components/ResumeForm/ExperienceForm";
import SummeryForm from "@/src/components/ResumeForm/SummaryForm";
import SkillForm from "@/src/components/ResumeForm/SkillForm";
import { GoSidebarCollapse } from "react-icons/go";
import PersonalDetailsForm from "@/src/components/ResumeForm/PersonalDetailsForm";
import SidebarNavigaition from "@/src/components/SidebarNavigation";
import Sidebar from "@/src/components/Sidebar";
import { certificateDefault, educationDefault, experienceDefault, languageDefault, personalDetailsDefault, projectDefault, skillDefault } from "../data/initialData";
import CertificateForm from "../components/ResumeForm/CertificateForm";
import LanguageForm from "../components/ResumeForm/LanguageForm";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { GrLogout } from "react-icons/gr";
import { RussoOne } from "../app/fonts/font";
import Link from "next/link";
import DefualttUserImg from 'public/user.png'
import { useResumeInfo } from "../context/ResumeInfoContext";
import { RiHomeFill } from "react-icons/ri";
import { logout } from "@/services/supabase";


type Props = {
    resumeData: ResumeInfo,
    user: {
        img: string
    }
}

export default function ResumeMain({ resumeData, user }: Props) {

    const { setResumeInfo } = useResumeInfo();

    useEffect(() => {
        if (resumeData) setResumeInfo(resumeData as never)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const { img } = user;
    const [isOpen, setIsOpen] = useState(false)
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const [modalType, setModalType] = useState('');
    const [actionType, setActionType] = useState<'add' | 'edit'>('edit');
    const [index, setIndex] = useState<number>(0);
    const [project, setProject] = useState<Project>(projectDefault)
    const [education, setEducation] = useState<Education>(educationDefault);
    const [experience, setExperience] = useState<Experience>(experienceDefault);
    const [personalDetails, setPersonalDetails] = useState<PersonalDetails>(personalDetailsDefault);
    const [summary, setSummary] = useState<string>();
    const [skill, setSkill] = useState<Skill>(skillDefault);
    const [certificate, setCertificate] = useState<Certificate>(certificateDefault)
    const [language, setLanguage] = useState<Language>(languageDefault);

    return (
        <>
            <div className="bg-slate-950 flex flex-col xl:hidden justify-start min-w-screen h-screen bg-grid-cyan-800/[0.2]">
                <div className=" px-6 py-4 mt-3 flex items-center justify-between ">
                    <Sheet >
                        <SheetTrigger className="text-cyan-500  text-3xl my-auto" > <GoSidebarCollapse /></SheetTrigger>
                        <SheetContent onOpenAutoFocus={(e) => e.preventDefault()} side={"left"} className="xl:hidden flex flex-col p-0 gap-12 overflow-y-scroll border-r border-r-cyan-800 bg-slate-950 text-white custom-scrollbar modal">
                            <Sidebar setActionType={setActionType} openModal={openModal} setModalType={setModalType} setIndex={setIndex} setPersonalDetails={setPersonalDetails} setSummary={setSummary} setExperience={setExperience} setProject={setProject} setEducation={setEducation} setSkill={setSkill} setCertificate={setCertificate} setLanguage={setLanguage} />
                        </SheetContent>
                    </Sheet>
                    <Link href={'/dashboard'} className="flex items-center justify-center text-white gap-2 text-base" ><RiHomeFill className="text-cyan-600 text-xl mb-0.5" />/<span className={`text-white ${RussoOne.className}`}> Dashboard</span></Link>
                    <Popover>
                        <PopoverTrigger>
                            <Image className="border-[2px] rounded-full border-cyan-500 object-cover" alt="img" src={img ? img : DefualttUserImg} width={35} height={30} />
                        </PopoverTrigger>
                        <PopoverContent className="bg-slate-95 w-28 mr-5 z-50 border mt-2 rounded-none  border-gray-600 text-white p-0">
                            <div onClick={logout} className={`${RussoOne.className} min-w-full cursor-pointer bg-slate-950  transition-all duration-150 ease-in-out transform active:scale-95 flex items-center justify-center gap-4 p-2 border-none text-sm  sm:text-base xl:text-lg`} >
                                <span>Logout</span><GrLogout className="text-cyan-300" /></div>
                        </PopoverContent>
                    </Popover>
                </div>
                <ResumePreview id={'pdf-mobile'} />
            </div>
            <div className=" h-screen min-w-screen dark:bg-black bg-slate-950 hidden xl:flex  justify-center lg:justify-between  bg-grid-cyan-800/[0.2]">

                <div className="flex text-white   xl:items-start justify-start min-h-screen xl:bg-slate-950 w-max">

                    <div className="hidden xl:flex flex-col justify-between h-[95%] items-center my-4  ">
                        <div className="flex border-b border-cyan-700 items-center w-full flex-col gap-4">

                            <Link className="hover:bg-cyan-800 hover:bg-opacity-30 p-2 mb-4" href={'/dashboard'}>
                                < RiHomeFill className="text-xl text-cyan-600" />
                            </Link>
                        </div>
                        <SidebarNavigaition />
                        <Popover>
                            <PopoverTrigger>
                                <Image className="border-2 border-cyan-400 rounded-full object-cover" src={img ? img : DefualttUserImg} alt="img" width={35} height={35} />
                            </PopoverTrigger>
                            <PopoverContent className="bg-slate-950 w-30 ml-5 z-50 border rounded-none mt-3 border-gray-600 text-white p-1">
                                <div onClick={logout} className={`${RussoOne.className} min-w-full cursor-pointer hover:bg-cyan-950 bg-slate-950  transition-all duration-150 ease-in-out transform active:scale-95 flex items-center justify-center gap-4 p-1 border-none `} >
                                    <span>Logout</span><GrLogout className="text-cyan-300" /></div>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div
                        id="sidebar-scroll"
                        className="hidden xl:flex flex-col gap-12  w-[400px] max-h-screen overflow-y-scroll border-x border-x-cyan-800 custom-scrollbar"
                        style={{ scrollBehavior: "smooth" }}
                    >
                        <Sidebar setActionType={setActionType} openModal={openModal} setModalType={setModalType} setIndex={setIndex} setPersonalDetails={setPersonalDetails} setSummary={setSummary} setExperience={setExperience} setProject={setProject} setEducation={setEducation} setSkill={setSkill} setCertificate={setCertificate} setLanguage={setLanguage} />
                    </div>


                </div>
                <ResumePreview id={'pdf-desktop'} />
            </div >
            <Dialog open={isOpen}>
                <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} style={{ borderRadius: "0px" }} className="bg-slate-900 border w-[95vw] min-h-fit sm:h-fit  md:min-w-max  text-white border-cyan-800 m-0 p-0 modal">
                    {modalType === "personal-details" && <PersonalDetailsForm data={personalDetails} closeModal={closeModal} />}
                    {modalType === "summary" && <SummeryForm summaryData={summary} closeModal={closeModal} />}
                    {modalType === "experience" && <ExperienceForm experienceData={experience} index={index} closeModal={closeModal} actionType={actionType} />}
                    {modalType === "project" && <ProjectForm projectData={project} index={index} closeModal={closeModal} actionType={actionType} />}
                    {modalType === "education" && <EducationForm educationData={education} index={index} closeModal={closeModal} actionType={actionType} />}
                    {modalType === "skill" && <SkillForm skillsData={skill} index={index} closeModal={closeModal} actionType={actionType} />}
                    {modalType === "certificate" && <CertificateForm certificateData={certificate} index={index} closeModal={closeModal} actionType={actionType} />}
                    {modalType === "language" && <LanguageForm languageData={language} index={index} closeModal={closeModal} actionType={actionType} />}
                </DialogContent>
            </Dialog>
        </>
    );
}

