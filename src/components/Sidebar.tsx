import PersonalDetailsSection from "@/src/components/ResumeSidebar/PersonalDetailsSection";
import SummarySection from "@/src/components/ResumeSidebar/SummarySection";
import ExperienceSection from "@/src/components/ResumeSidebar/ExperienceSection";
import ProjectSection from "@/src/components/ResumeSidebar/ProjectSection";
import EducationSection from "@/src/components/ResumeSidebar/EducationSection";
import SkillSection from "@/src/components/ResumeSidebar/SkillSection";
import { Certificate, Education, Experience, Language, PersonalDetails, Project, Skill, } from "../Types/ResumeTypes";
import React from "react";
import CertificateSection from "./ResumeSidebar/CertificateSection";
import LanguageSection from "./ResumeSidebar/LanguageSection";


type SideBarProps =
    {
        setActionType: React.Dispatch<React.SetStateAction<'add' | 'edit'>>
        setIndex: React.Dispatch<React.SetStateAction<number>>,
        setModalType: React.Dispatch<React.SetStateAction<string>>,
        openModal: () => void;
        setPersonalDetails: React.Dispatch<React.SetStateAction<PersonalDetails>>,
        setSummary: React.Dispatch<React.SetStateAction<string | undefined>>,
        setExperience: React.Dispatch<React.SetStateAction<Experience>>,
        setProject: React.Dispatch<React.SetStateAction<Project>>,
        setEducation: React.Dispatch<React.SetStateAction<Education>>,
        setSkill: React.Dispatch<React.SetStateAction<Skill>>,
        setCertificate: React.Dispatch<React.SetStateAction<Certificate>>
        setLanguage: React.Dispatch<React.SetStateAction<Language>>
    }


function Sidebar({ setActionType, openModal, setModalType, setIndex, setPersonalDetails, setSummary, setExperience, setProject, setEducation, setSkill, setCertificate, setLanguage }: SideBarProps) {
    return (
        <>
            <PersonalDetailsSection setModalType={setModalType} setPersonalDetails={setPersonalDetails} openModal={openModal} setActionType={setActionType} />
            <hr className="border mx-auto border-cyan-600 min-w-[90%]" />
            <SummarySection setModalType={setModalType} setSummary={setSummary} openModal={openModal} />
            <hr className="border mx-auto border-cyan-600 min-w-[90%]" />
            <ExperienceSection setIndex={setIndex} setModalType={setModalType} setExperience={setExperience} openModal={openModal} setActionType={setActionType} />
            <hr className="border mx-auto border-cyan-600 min-w-[90%]" />
            <ProjectSection setIndex={setIndex} setModalType={setModalType} setProject={setProject} openModal={openModal} setActionType={setActionType} />
            <hr className="border mx-auto border-cyan-600 min-w-[90%]" />
            <EducationSection setIndex={setIndex} setModalType={setModalType} setEducation={setEducation} openModal={openModal} setActionType={setActionType} />
            <hr className="border mx-auto border-cyan-600 min-w-[90%]" />
            <SkillSection setIndex={setIndex} setSkill={setSkill} setModalType={setModalType} openModal={openModal} setActionType={setActionType} />
            <hr className="border mx-auto border-cyan-600 min-w-[90%]" />
            <CertificateSection setIndex={setIndex} setCertificate={setCertificate} setModalType={setModalType} openModal={openModal} setActionType={setActionType} />
            <hr className="border mx-auto border-cyan-600 min-w-[90%]" />
            <LanguageSection setIndex={setIndex} setLanguage={setLanguage} setModalType={setModalType} openModal={openModal} setActionType={setActionType} />
        </>
    )
}

export default Sidebar