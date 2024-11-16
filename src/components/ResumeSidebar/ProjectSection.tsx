import { Project } from "@/src/Types/ResumeTypes";
import { Button } from "@/components/ui/button";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { toggleIsSectionVisible, toggleIsVisible } from "@/src/helpers/helper";
import { FaCopy } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { useResumeInfo } from "@/src/context/ResumeInfoContext";
import { projectDefault } from "@/src/data/initialData";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { GiHamburgerMenu } from "react-icons/gi";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { GrPowerReset } from "react-icons/gr";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { RussoOne } from "@/src/app/fonts/font";
import { deleteSection, deleteSectionEntry, editResume, editSectionEntry } from "@/services/supabase";
import { toast } from "sonner";


type ProjectSectionProps =
    {
        setActionType: React.Dispatch<React.SetStateAction<'add' | 'edit'>>
        setIndex: React.Dispatch<React.SetStateAction<number>>
        setModalType: React.Dispatch<React.SetStateAction<string>>,
        setProject: React.Dispatch<React.SetStateAction<Project>>,
        openModal: () => void;
    }

const ProjectSection = ({ setActionType, setIndex, setProject, setModalType, openModal }: ProjectSectionProps) => {

    const { resumeInfo, setResumeInfo } = useResumeInfo();

    const addProject = () => {
        setIndex(resumeInfo.projects.length)
        setActionType('add')
        setProject(projectDefault);
        setModalType('project');
        openModal();
    };

    const deleteProject = async (id: string) => {
        try {
            await deleteSectionEntry('projects', id)
            setResumeInfo((prevResumeInfo) => ({
                ...prevResumeInfo,
                projects: prevResumeInfo.projects.filter((proj) => proj.id !== id),
            }));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error: any) {
            toast(`${error.message}`)
        }
    }

    const resetProjectSection = () => {

        deleteSection('projects', resumeInfo.resume_id)

        setResumeInfo((prevResumeInfo) => (
            {
                ...prevResumeInfo,
                projects: []
            }
        ))
    }


    return (
        resumeInfo.projects.length > 0 ? (<div id="project" className="sm:p-5 px-3 py-4">
            <h2 className="sm:text-xl flex items-center justify-between font-bold text-white">
                <span className={`${RussoOne.className}`}>Project</span>
                <Popover>
                    <PopoverTrigger className="hover:bg-cyan-300 hover:bg-opacity-20 p-2">
                        <GiHamburgerMenu className=" cursor-pointer text-xl  " />
                    </PopoverTrigger>
                    <PopoverContent className="bg-slate-950 w-36 z-50 border rounded-none mt-3 border-gray-600 text-white p-1">
                        <Button className="flex w-full bg-slate-950 border-none justify-start gap-3 hover:bg-cyan-900 hover:bg-opacity-40 text-cyan-400 " onClick={() => {
                            toggleIsSectionVisible('Project', setResumeInfo);
                            editResume(resumeInfo.resume_id, { isProjectVisible: !resumeInfo.isProjectVisible })
                        }} >{resumeInfo.isProjectVisible ? <IoEye /> : <IoEyeOff />} <span className="text-white">{resumeInfo.isProjectVisible ? "Visible" : "Hidden"}</span> </Button>
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
                                    <AlertDialogAction className="bg-cyan-500 text-slate-950 border-none hover:bg-cyan-500 hover:bg-opacity-100" onClick={resetProjectSection}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                    </PopoverContent>
                </Popover>
            </h2>
            {resumeInfo.projects.map((proj: Project, index: number) => (

                <ContextMenu key={proj.id} >
                    <ContextMenuTrigger className={`${(proj.isVisible && resumeInfo.isProjectVisible) ? 'opacity-100' : "opacity-60"} select-none`}>
                        <div
                            key={index}
                            onClick={() => {
                                setIndex(index);
                                setActionType('edit');
                                setModalType("project");
                                setProject(proj)
                                openModal(); // Open dialog for specific experience
                            }}
                            className="mt-5 p-4 flex flex-col gap-2 cursor-pointer bg-slate-900 border border-cyan-800 hover:bg-cyan-600 hover:bg-opacity-30"
                        >
                            <p className="text-xs sm:text-sm font-semibold">{proj.name}</p>

                        </div>
                    </ContextMenuTrigger>
                    <ContextMenuContent className="bg-slate-950 rounded-none  border-gray-600 text-white ">
                        <ContextMenuItem className="text-white flex justify-start gap-3 hover:bg-cyan-800 hover:bg-opacity-40" onClick={() => {
                            setIndex(resumeInfo.projects.length);
                            setActionType('add')
                            setModalType("project");
                            setProject(proj)
                            openModal(); // Open dialog for specific experience
                        }}> <FaCopy /><span>Duplicate</span></ContextMenuItem>
                        <ContextMenuItem className="flex justify-start gap-3 hover:bg-cyan-800 hover:bg-opacity-40" onClick={() => {
                            toggleIsVisible('projects', index, setResumeInfo);
                            editSectionEntry('projects', proj.id, { isVisible: !proj.isVisible })
                        }} ><TiTick className={`text-lg ${proj.isVisible ? 'visible' : 'invisible'}`} /> <span>Visible</span> </ContextMenuItem>
                        <AlertDialog  >
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
                                    <AlertDialogAction className="bg-cyan-500 text-slate-950 border-none hover:bg-cyan-500 hover:bg-opacity-100" onClick={() => deleteProject(proj.id)}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </ContextMenuContent>
                </ContextMenu>
            ))}
            <Button className="mt-5 text-xs  text-white px-4 py-2 float-right" onClick={addProject}>
                Add Project
            </Button>
        </div>) :
            (<div id="project" className="sm:p-5 px-3 py-4 ">
                <h2 className={`${RussoOne.className} sm:text-xl font-bold text-white`}>Project</h2>
                <div
                    onClick={addProject}
                    className="mt-5 cursor-pointer p-3 bg-transparent border border-dashed text-center border-cyan-800 hover:bg-cyan-600 hover:bg-opacity-30"
                >
                    <p className="flex items-center justify-center gap-2">
                        <span className="text-2xl md:text-3xl text-cyan-300">+</span>
                        <span className="md:mt-1 text-sm md:text-base">Project</span>
                    </p>
                </div>
            </div>)
    );
};

export default ProjectSection