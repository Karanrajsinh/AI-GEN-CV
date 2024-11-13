import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useResumeInfo } from "@/src/context/ResumeInfoContext";
import { toggleIsVisible } from "@/src/helpers/helper";
import { GrPowerReset } from "react-icons/gr";
import { TiTick } from "react-icons/ti";
import { RussoOne } from "@/src/app/fonts/font";

type SummarySectionProps = {
    setModalType: React.Dispatch<React.SetStateAction<string>>,
    setSummary: React.Dispatch<React.SetStateAction<string | undefined>>,
    openModal: () => void;
}




const SummarySection = ({ setModalType, setSummary, openModal }: SummarySectionProps) => {

    const { resumeInfo, setResumeInfo } = useResumeInfo();

    const resetSummary = () => {
        setResumeInfo((prev) => {
            return {
                ...prev,
                summary: ''
            }
        })
    }

    return (
        resumeInfo.summary.length > 0 ? (
            <ContextMenu>
                <ContextMenuTrigger className={`${resumeInfo.summaryVisible ? 'opacity-100' : 'opacity-60'}`}>
                    <div id="summary" className="sm:p-5 px-3 py-4 ">
                        <h2 className={`sm:text-xl font-bold text-white ${RussoOne.className}`}>Summary</h2>
                        <div
                            onClick={() => {
                                setModalType("summary");
                                setSummary(resumeInfo.summary);
                                openModal();
                            }}
                            className="cursor-pointer mt-5 p-4 bg-slate-900 border border-cyan-800 hover:bg-cyan-600 hover:bg-opacity-30"
                        >
                            <p className="text-xs">{resumeInfo.summary}</p>
                        </div>
                    </div>
                </ContextMenuTrigger>
                <ContextMenuContent className="bg-slate-950 rounded-none border-gray-600 text-white">
                    <ContextMenuItem
                        className="flex justify-start gap-3 hover:bg-cyan-800 hover:bg-opacity-40"
                        onClick={() => toggleIsVisible('summary', undefined, setResumeInfo)}
                    >
                        <TiTick className={`text-lg ${resumeInfo.summaryVisible ? 'visible' : 'invisible'}`} />
                        <span>Visible</span>
                    </ContextMenuItem>
                    <AlertDialog >
                        <AlertDialogTrigger className="flex w-full bg-slate-950 text-sm items-center border-none justify-start py-2 px-2 text-cyan-400  gap-4 hover:bg-cyan-900 hover:bg-opacity-40"><GrPowerReset /><span className="font-normal">Reset</span></AlertDialogTrigger>
                        <AlertDialogContent className="rounded-none border-cyan-800 bg-slate-900 w-[95vw]  text-white">
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription className="text-slate-500">
                                    This action cannot be undone. This will permanently delete the content of this section .
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="flex gap-3 mt-3">
                                <AlertDialogCancel className="border border-cyan-600  bg-transparent hover:text-current hover:bg-cyan-800 hover:bg-opacity-40">Cancel</AlertDialogCancel>
                                <AlertDialogAction className="bg-cyan-500 text-slate-950 border-none hover:bg-cyan-500 hover:bg-opacity-100" onClick={resetSummary}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </ContextMenuContent>
            </ContextMenu>
        ) : (
            <div id="summary" className="sm:p-5 px-3 py-4 ">
                <h2 className={`${RussoOne.className} sm:text-xl font-bold text-white`}>Summary</h2>
                <div
                    onClick={() => {
                        setModalType("summary");
                        setSummary(resumeInfo.summary);
                        openModal();
                    }}
                    className="mt-5 cursor-pointer p-3 bg-transparent border border-dashed text-center border-cyan-800 hover:bg-cyan-600 hover:bg-opacity-30"
                >
                    <p className="flex items-center justify-center gap-2">
                        <span className="text-2xl md:text-3xl text-cyan-300">+</span>
                        <span className="md:mt-1 text-sm">Summary</span>
                    </p>
                </div>
            </div>
        )
    );
};

export default SummarySection;