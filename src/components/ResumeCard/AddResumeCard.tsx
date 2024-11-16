import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { FiPlus } from "react-icons/fi"
import ResumeCardForm from "./ResumeCardForm"
import { useState } from "react";
import { useUserDetails } from "@/src/context/UserContext";
import { useResumeInfo } from "@/src/context/ResumeInfoContext";
import { Resume } from "@/src/Types/ResumeTypes";

type Props = {
    setResumes: React.Dispatch<React.SetStateAction<Resume[]>>
}

function AddResumeCard({ setResumes }: Props) {

    const [open, setOpen] = useState(false);
    const { resumeInfo } = useResumeInfo();
    const { userID } = useUserDetails()





    const openDialog = () => {
        setOpen(true)
    }
    const closeDialog = () => {
        setOpen(false);
    }

    return (
        <Dialog open={open}>
            <DialogTrigger onClick={openDialog} className=" cursor-pointer w-[250px] xl:w-[300px] min-h-[300px] xl:min-h-[400px] active:scale-95 transition-all duration-150 ease-in-out transform  flex flex-col text-cyan-300 items-start p-4 justify-end bg-slate-900  border hover:bg-slate-800 border-cyan-700">
                <FiPlus className="text-2xl xl:text-4xl  my-auto mx-auto" />
                <p className="text-left text-sm xl:text-base">Add Resume</p>
            </DialogTrigger>
            <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} style={{ borderRadius: "0px" }} className="bg-slate-900 border w-[95vw] min-h-fit sm:h-fit  md:min-w-max  text-white border-cyan-800 m-0 p-0 modal">
                <ResumeCardForm setResumes={setResumes} closeDialog={closeDialog} />
            </DialogContent>
        </Dialog>
    )
}

export default AddResumeCard