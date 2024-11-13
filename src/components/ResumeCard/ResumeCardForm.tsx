import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResumeInfo } from "@/src/context/ResumeInfoContext";
import { useForm } from "react-hook-form";
import { IoAddSharp } from "react-icons/io5";


type ResumeCardFormProps =
    {
        closeDialog: () => void
    }

function ResumeCardForm({ closeDialog }: ResumeCardFormProps) {
    const { setResumeInfo } = useResumeInfo();


    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {},
    });




    const onSave = () => {


    };

    return (
        <form onSubmit={handleSubmit(onSave)} className='p-5 '>
            <div className=' items-center flex ml-4 gap-3 font-semibold'><IoAddSharp className="text-2xl" /><span>Create Resume</span></div>
            <div className='grid grid-cols- gap-3 p-3 my-5 rounded-lg'>
                <div className='col-span-2'>
                    <label className='text-sm mb-2'>Name </label>
                    <Input
                        className='mt-2'
                    />
                </div>
            </div>

            <div className='flex justify-end gap-6 mr-1 mt-6'>
                <Button onClick={closeDialog}>
                    Cancel
                </Button>
                <Button type="submit" className='bg-cyan-500 hover:bg-cyan-500 hover:bg-opacity-80 text-slate-950' >

                </Button>
            </div>
        </form >
    );
}

export default ResumeCardForm