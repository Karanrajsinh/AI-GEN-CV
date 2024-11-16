import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addResume } from "@/services/supabase";
import { useUserDetails } from "@/src/context/UserContext";
import { resumeDefault } from "@/src/data/initialData";
import { Resume } from "@/src/Types/ResumeTypes";
import { useForm } from "react-hook-form";
import { IoAddSharp } from "react-icons/io5";


type ResumeCardFormProps =
    {
        closeDialog: () => void;
        setResumes: React.Dispatch<React.SetStateAction<Resume[]>>
    }

function ResumeCardForm({ closeDialog, setResumes }: ResumeCardFormProps) {


    const { name, email } = useUserDetails();

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: resumeDefault
    });




    const onSave = async (data: { name: string }) => {
        const resume = await addResume(data.name, name, email)
        setResumes((prevResumes) => [...prevResumes, resume])

        closeDialog();
    };

    return (
        <form onSubmit={handleSubmit(onSave)} className='p-5 '>
            <div className=' items-center flex ml-4 gap-3 font-semibold'><IoAddSharp className="text-2xl" /><span>Create Resume</span></div>
            <div className='grid grid-cols- gap-3 p-3 my-5 rounded-lg'>
                <div className='col-span-2'>
                    <label className='text-sm mb-2'>Name </label>
                    <Input
                        className='mt-2'
                        {...register("name", {
                            required: "Field Cannot Be Empty",
                        })}
                    />
                    {errors.name && (
                        <p className="text-cyan-500 text-xs mt-1">{errors.name.message}</p>
                    )}
                </div>
            </div>

            <div className='flex justify-end gap-6 mr-1 mt-6'>
                <Button onClick={closeDialog}>
                    Cancel
                </Button>
                <Button type="submit" className='bg-cyan-500 hover:bg-cyan-500 hover:bg-opacity-80 text-slate-950' >
                    Create
                </Button>
            </div>
        </form >
    );
}

export default ResumeCardForm