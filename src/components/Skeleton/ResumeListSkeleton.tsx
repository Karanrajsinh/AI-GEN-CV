import { Skeleton } from "@/components/ui/skeleton";
import { RussoOne } from "@/src/app/fonts/font";

function ResumeListSkeleton() {
    return (
        <div className="h-screen min-w-screen flex flex-col lg:flex-row bg-slate-950">
            <div className="border-r hidden lg:flex text-white py-8 flex-col items-center justify-between border-cyan-600 h-screen w-1/6">
                <div className="w-[90%] flex gap-4 flex-col items-center justify-center">
                    <Skeleton className="h-10 w-10 mb-4" />
                    <hr className="border-[0.5] border-cyan-900 w-full " />
                </div>
                <div className="w-[90%] flex flex-col gap-4 items-center justify-center">
                    <hr className="border-[0.5] border-cyan-900 w-full " />

                    <div className="flex justify-center lg:gap-1 xl:gap-4 items-center min-w-full p-2">
                        <Skeleton className="h-[40px] w-[40px] rounded-full" />
                        <Skeleton className="w-36 h-10 ml-2" />
                    </div>


                </div>
            </div>
            <div className="lg:hidden border-b border-cyan-600 px-6 py-4 mt-3 flex items-center justify-between ">
                <Skeleton className="h-8 w-8" />

                <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <div className={`${RussoOne.className} bg-grid-cyan-800/[0.2] text-white h-screen  flex w-full justify-center lg:justify-normal  lg:w-5/6 gap-6 px-10 flex-col`}>
                <p className={` hidden lg:block text-xl lg:text-4xl  lg:mt-8 `}>Resumes</p>
                <div className="flex flex-col lg:flex-row gap-10 h-[80vh] lg:h-auto w-full lg:w-[5/6] lg:flex-wrap custom-scrollbar overflow-y-scroll justify-start items-center">
                    <Skeleton className="w-[250px] xl:w-[300px] min-h-[320px] xl:min-h-[400px]" />
                    <Skeleton className="w-[250px] xl:w-[300px] min-h-[320px] xl:min-h-[400px]" />
                    <Skeleton className="w-[250px] xl:w-[300px] min-h-[320px] xl:min-h-[400px]" />
                </div>
            </div>
        </div>
    )
}

export default ResumeListSkeleton