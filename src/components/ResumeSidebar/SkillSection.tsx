import { Skill } from "@/src/Types/ResumeTypes";
import { Button } from "@/components/ui/button";
import { useResumeInfo } from "@/src/context/ResumeInfoContext";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { FaCopy } from "react-icons/fa";
import { toggleIsSectionVisible, toggleIsVisible } from "@/src/helpers/helper";
import { ImBin2 } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { skillDefault } from "@/src/data/initialData";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { GiHamburgerMenu } from "react-icons/gi";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { GrPowerReset } from "react-icons/gr";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { RussoOne } from "@/src/app/fonts/font";


type ProjectSectionProps =
    {
        setActionType: React.Dispatch<React.SetStateAction<'add' | 'edit'>>
        setIndex: React.Dispatch<React.SetStateAction<number>>
        setModalType: React.Dispatch<React.SetStateAction<string>>,
        setSkill: React.Dispatch<React.SetStateAction<Skill>>,
        openModal: () => void;
    }

const SkillSection = ({ setActionType, setIndex, setSkill, setModalType, openModal }: ProjectSectionProps) => {

    const { resumeInfo, setResumeInfo } = useResumeInfo();

    const addSkill = () => {
        setIndex(resumeInfo.skills.length)
        setActionType('add')
        setSkill(skillDefault);
        setModalType('skill');
        openModal();
    };


    const deleteSkill = (index: number) => {
        setResumeInfo((prevResumeInfo) => ({
            ...prevResumeInfo,
            skills: prevResumeInfo.skills.filter((_, i) => i !== index),
        }));
    }

    const resetSkillSection = () => {
        setResumeInfo((prevResumeInfo) => (
            {
                ...prevResumeInfo,
                skills: []
            }
        ))
    }

    return (
        resumeInfo.skills.length > 0 ? (<div id="skill" className="sm:p-5 px-3 py-4">
            <h2 className="sm:text-xl flex items-center justify-between font-bold text-white">
                <span className={`${RussoOne.className}`}>Skill</span>
                <Popover>
                    <PopoverTrigger className="hover:bg-cyan-300 hover:bg-opacity-20 p-2">
                        <GiHamburgerMenu className=" cursor-pointer text-xl  " />
                    </PopoverTrigger>
                    <PopoverContent className="bg-slate-950 w-36 z-50 border rounded-none mt-3 border-gray-600 text-white p-2">
                        <Button className="flex w-full bg-slate-950 border-none justify-start gap-3 hover:bg-cyan-900 hover:bg-opacity-40 text-cyan-400 " onClick={() => toggleIsSectionVisible('Skill', setResumeInfo)} >{resumeInfo.isSkillVisible ? <IoEye /> : <IoEyeOff />} <span className="text-white">{resumeInfo.isSkillVisible ? "Visible" : "Hidden"}</span> </Button>
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
                                    <AlertDialogAction className="bg-cyan-500 text-slate-950 border-none hover:bg-cyan-500 hover:bg-opacity-100" onClick={resetSkillSection}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                    </PopoverContent>
                </Popover>
            </h2>
            {resumeInfo.skills.map((skill: Skill, index: number) => (
                <ContextMenu key={index} >
                    <ContextMenuTrigger className={`${(skill.isVisible && resumeInfo.isSkillVisible) ? 'opacity-100' : "opacity-60"}`}>
                        <div
                            key={index}
                            onClick={() => {
                                setIndex(index);
                                setActionType('edit')
                                setModalType("skill");
                                setSkill(skill)
                                openModal();
                            }}
                            className="mt-5 p-4 flex flex-col gap-2 cursor-pointer bg-slate-900 border border-cyan-800 hover:bg-cyan-600 hover:bg-opacity-30"
                        >
                            <p className="text-xs sm:text-sm font-semibold">{skill.name}</p>
                        </div>
                    </ContextMenuTrigger>
                    <ContextMenuContent className="bg-slate-950 rounded-none  border-gray-600 text-white ">
                        <ContextMenuItem className="text-white flex justify-start gap-3 hover:bg-cyan-800 hover:bg-opacity-50" onClick={() => {
                            setIndex(index);
                            setActionType('add')
                            setModalType("skill");
                            setSkill(skill)
                            openModal();
                        }}> <FaCopy /><span>Duplicate</span></ContextMenuItem>
                        <ContextMenuItem className="flex justify-start gap-3 hover:bg-cyan-800 hover:bg-opacity-40" onClick={() => toggleIsVisible('skills', index, setResumeInfo)} ><TiTick className={`text-lg ${skill.isVisible ? 'visible' : 'invisible'}`} /> <span>Visible</span> </ContextMenuItem>
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
                                    <AlertDialogAction className="bg-cyan-500 text-slate-950 border-none hover:bg-cyan-500 hover:bg-opacity-100" onClick={() => deleteSkill(index)}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </ContextMenuContent>
                </ContextMenu>
            ))}
            <Button className="mt-5 text-xs  text-white px-4 py-2 float-right" onClick={addSkill}>
                Add Skill
            </Button>
        </div>) : <div id="skill" className="sm:p-5 px-3 py-4 ">
            <h2 className={`${RussoOne.className} sm:text-xl font-bold text-white`}>Skill</h2>
            <div
                onClick={addSkill}
                className="mt-5 cursor-pointer p-3 bg-transparent border border-dashed text-center border-cyan-800 hover:bg-cyan-600 hover:bg-opacity-30"
            >
                <p className="flex items-center justify-center gap-2">
                    <span className="text-2xl md:text-3xl text-cyan-300">+</span>
                    <span className="md:mt-1 text-sm md:text-base">Skill</span>
                </p>
            </div>
        </div>
    );
};

export default SkillSection;