import { resumeDefault } from "@/src/data/initialData";
import { Resume } from "@/src/Types/ResumeTypes";
import { FiPlus } from "react-icons/fi"

type Props = {
    setActionType: React.Dispatch<React.SetStateAction<'add' | 'edit' | 'duplicate'>>,
    openDialog: () => void,
    setResumeData: React.Dispatch<React.SetStateAction<Resume>>
}

function AddResumeCard({ openDialog, setActionType, setResumeData }: Props) {


    return (
        <div onClick={() => {
            openDialog();
            setActionType('add')
            setResumeData(resumeDefault)
        }
        } className=" cursor-pointer w-[250px] xl:w-[300px] min-h-[320px] xl:min-h-[400px] active:scale-95 transition-all duration-150 ease-in-out transform  flex flex-col text-cyan-300 items-start p-4 justify-end bg-slate-900  border hover:bg-slate-800 border-cyan-700">
            <FiPlus className="text-2xl xl:text-4xl  my-auto mx-auto" />
            <p className="text-left text-sm xl:text-base">Add Resume</p>
        </div>


    )
}

export default AddResumeCard