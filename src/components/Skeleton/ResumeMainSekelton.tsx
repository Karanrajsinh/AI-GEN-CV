import { Skeleton } from "@/components/ui/skeleton";
import { RussoOne } from "@/src/app/fonts/font";

export default function ResumeMainSkeleton() {
    return (
        <>
            <div className="bg-slate-950 flex flex-col xl:hidden justify-start min-w-screen h-screen bg-grid-cyan-800/[0.2]">
                <div className=" px-6 py-4 mt-3 flex items-center justify-between ">

                    <Skeleton className="p-4" />
                    <Skeleton className="border-2 w-[35px] h-[35px] border-cyan-400 rounded-full object-cover" />
                </div>
                <div className="flex flex-col gap-4 items-center w-[90%] justify-center  mx-auto xl:mx-0 xl:w-[50%] xl:my-8">
                    <div className="w-full xl:w-3/4 min-h-[75vh] xl:min-h-[88vh]  overflow-hidden xl:border xl:border-cyan-600 xl:bg-slate-900 xl:bg-dot-cyan-900 flex justify-center items-center" />
                    <div className="flex items-center justify-center ">
                        <Skeleton className="h-10 w-56" />
                    </div>
                </div>
            </div>



            <div className="h-screen hidden xl:flex dark:bg-black bg-slate-950 justify-center lg:justify-between bg-grid-cyan-800/[0.2]">
                {/* Sidebar Section */}
                <div className="flex text-white xl:items-start justify-start min-h-screen xl:bg-slate-950 w-max">
                    <div className="hidden xl:flex flex-col justify-between h-[95%] items-center my-4  ">
                        <div className="flex border-b border-cyan-700 items-center w-full flex-col gap-4">
                            <Skeleton className=" p-4" />
                            <Skeleton className=" p-4 mb-4" />
                        </div>
                        <div
                            className={
                                "mx-auto hidden xl:flex flex-col gap-4 justify-center items-center bg-transparent p-3"}
                        >
                            <div className="relative h-8 w-8 flex items-center justify-center">
                                <Skeleton className="h-8 w-8" />
                            </div>
                            <div className="relative h-8 w-8 flex items-center justify-center">
                                <Skeleton className="h-8 w-8" />
                            </div>
                            <div className="relative h-8 w-8 flex items-center justify-center">
                                <Skeleton className="h-8 w-8" />
                            </div>
                            <div className="relative h-8 w-8 flex items-center justify-center">
                                <Skeleton className="h-8 w-8" />
                            </div>
                            <div className="relative h-8 w-8 flex items-center justify-center">
                                <Skeleton className="h-8 w-8" />
                            </div>
                            <div className="relative h-8 w-8 flex items-center justify-center">
                                <Skeleton className="h-8 w-8" />
                            </div>
                            <div className="relative h-8 w-8 flex items-center justify-center">
                                <Skeleton className="h-8 w-8" />
                            </div>
                            <div className="relative h-8 w-8 flex items-center justify-center">
                                <Skeleton className="h-8 w-8" />
                            </div>
                        </div>
                        <Skeleton className="border-2 w-[40px] h-[40px] border-cyan-400 rounded-full object-cover" />
                    </div>
                    <div
                        id="sidebar-scroll"
                        className="hidden xl:flex flex-col gap-12 w-[400px] max-h-screen overflow-y-scroll border-x border-x-cyan-800 custom-scrollbar"
                    >
                        <div className="sm:p-5 px-3 py-4 ">
                            <h2 className={`${RussoOne.className} sm:text-xl font-bold text-white`}>Personal Details</h2>
                            <Skeleton
                                className="mt-5 p-8    text-center "
                            >
                            </Skeleton>
                        </div>
                        <div className="sm:p-5 px-3 py-4 ">
                            <h2 className={`${RussoOne.className} sm:text-xl font-bold text-white`}>Summary</h2>
                            <Skeleton
                                className="mt-5 p-8    text-center "
                            >
                            </Skeleton>
                        </div>
                        <div className="sm:p-5 px-3 py-4 ">
                            <h2 className={`${RussoOne.className} sm:text-xl font-bold text-white`}>Experience</h2>
                            <Skeleton
                                className="mt-5 p-8    text-center "
                            >
                            </Skeleton>
                        </div>
                        <div className="sm:p-5 px-3 py-4 ">
                            <h2 className={`${RussoOne.className} sm:text-xl font-bold text-white`}>Project</h2>
                            <Skeleton
                                className="mt-5 p-8    text-center "
                            >
                            </Skeleton>
                        </div>
                        <div className="sm:p-5 px-3 py-4 ">
                            <h2 className={`${RussoOne.className} sm:text-xl font-bold text-white`}>Education</h2>
                            <Skeleton
                                className="mt-5 p-8    text-center "
                            >
                            </Skeleton>
                        </div>
                        <div className="sm:p-5 px-3 py-4 ">
                            <h2 className={`${RussoOne.className} sm:text-xl font-bold text-white`}>Skill</h2>
                            <Skeleton
                                className="mt-5 p-8    text-center "
                            >
                            </Skeleton>
                        </div>
                        <div className="sm:p-5 px-3 py-4 ">
                            <h2 className={`${RussoOne.className} sm:text-xl font-bold text-white`}>Certificate</h2>
                            <Skeleton
                                className="mt-5 p-8    text-center "
                            >
                            </Skeleton>
                        </div>
                        <div className="sm:p-5 px-3 py-4 ">
                            <h2 className={`${RussoOne.className} sm:text-xl font-bold text-white`}>Language</h2>
                            <Skeleton
                                className="mt-5 p-8    text-center "
                            >
                            </Skeleton>
                        </div>
                    </div>
                </div>

                {/* Resume Preview Section */}
                <div className="flex flex-col gap-4 items-center w-[90%] mx-auto xl:mx-0 xl:w-[50%] xl:my-8">
                    <Skeleton className="w-full xl:w-3/4 h-[75vh] xl:min-h-[88vh]  overflow-hidden xl:border xl:border-cyan-600 xl:bg-slate-900 xl:bg-dot-cyan-900 flex justify-center items-center" />
                    <div className="flex items-center justify-center ">
                        <Skeleton className="h-10 w-56" />
                    </div>
                </div>
            </div>
        </>
    )
}