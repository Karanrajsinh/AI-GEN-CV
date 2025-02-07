import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import { deleteResume } from "@/src/services/supabase"
import { Resume } from "@/src/Types/ResumeTypes"
import Link from "next/link"
import { useState } from "react"
import { FaCopy } from "react-icons/fa"
import { ImBin2 } from "react-icons/im"
import { MdEdit } from "react-icons/md"
import { toast } from "sonner"

type ResuemCardProps =
    {
        setActionType: React.Dispatch<React.SetStateAction<'add' | 'edit' | 'duplicate'>>,
        id: string,
        name: string,
        openDialog: () => void;
        setResumeData: React.Dispatch<React.SetStateAction<Resume>>
        setResumes: React.Dispatch<React.SetStateAction<Resume[]>>
    }

function ResumeCard({ id, name, setActionType, openDialog, setResumeData, setResumes }: ResuemCardProps) {

    const [deleting, setDeleting] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);

    function createDuplicateResume() {
        setActionType('duplicate')
        setResumeData((prev) => ({ ...prev, resume_name: `${name} (Copy)`, resume_id: id }))
        openDialog()
    }

    function renameResume() {
        setActionType('edit')
        setResumeData((prev) => ({ ...prev, resume_id: id, resume_name: name }))
        openDialog()
    }

    async function removeResume() {
        try {
            setDeleting(true)
            await deleteResume(id)
            setResumes((prevResumes) => prevResumes.filter((res) => res.resume_id !== id));
            setDeleting(false)
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error: any) {
            setDeleting(false)
            toast(`${error.message}`)
        }
    }

    return (
        <ContextMenu>
            <ContextMenuTrigger >
                <Link href={`/dashboard/resume/${id}`} className=" cursor-pointer w-[250px] xl:w-[300px] min-h-[320px] xl:min-h-[400px] md:min-h-[300px]  active:scale-95 transition-all duration-150 ease-in-out transform  flex flex-col text-cyan-300 items-start p-4 justify-end bg-slate-900 border hover:bg-slate-800 border-cyan-700">
                    <p className="text-sm xl:text-base text-left ">{name}</p>
                </Link>
            </ContextMenuTrigger>
            <ContextMenuContent className="bg-slate-950 rounded-none  border-gray-600 text-white ">
                <ContextMenuItem className="text-white flex justify-start gap-3 hover:bg-cyan-800 hover:bg-opacity-40" onClick={createDuplicateResume} > <FaCopy /><span>Duplicate</span></ContextMenuItem>
                <ContextMenuItem className="text-white flex justify-start gap-3 hover:bg-cyan-800 hover:bg-opacity-40" onClick={renameResume} > <MdEdit className="text-base" /><span>Rename</span></ContextMenuItem>
                <AlertDialog open={alertOpen} >
                    <AlertDialogTrigger className="flex w-full bg-slate-950 text-sm items-center border-none justify-start py-2 px-2 text-cyan-400  gap-3 hover:bg-cyan-800 hover:bg-opacity-40" onClick={() => setAlertOpen(true)}><ImBin2 /> <span>Delete</span></AlertDialogTrigger>
                    <AlertDialogContent className="rounded-none border-cyan-800 bg-slate-900 w-[95vw]  text-white">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription className="text-slate-500">
                                This action cannot be undone. This will permanently delete this resume
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex gap-3 mt-3">
                            <AlertDialogCancel disabled={deleting} className="border border-cyan-600  bg-transparent hover:text-current hover:bg-cyan-800 hover:bg-opacity-40" onClick={() => setAlertOpen(false)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction disabled={deleting} className="bg-cyan-500 text-slate-950 border-none hover:bg-cyan-500 hover:bg-opacity-100" onClick={removeResume} >Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </ContextMenuContent>
        </ContextMenu>
    )

}


export default ResumeCard