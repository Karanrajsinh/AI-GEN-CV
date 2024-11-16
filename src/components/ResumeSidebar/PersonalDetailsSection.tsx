import { RussoOne } from "@/src/app/fonts/font";
import { useResumeInfo } from "@/src/context/ResumeInfoContext";
import { PersonalDetails } from "@/src/Types/ResumeTypes";

type PersonalDetailsProps =
    {
        setActionType: React.Dispatch<React.SetStateAction<'add' | 'edit'>>
        setModalType: React.Dispatch<React.SetStateAction<string>>,
        setPersonalDetails: React.Dispatch<React.SetStateAction<PersonalDetails>>,
        openModal: () => void;
    }


const PersonalDetailsSection = ({ setModalType, setPersonalDetails, openModal }: PersonalDetailsProps) => {

    const { resumeInfo } = useResumeInfo();

    return (
        <div id="personal-details" className="sm:p-5 px-3 py-4  mt-4 sm:mt-0">
            <h2 className={`sm:text-xl font-bold text-white ${RussoOne.className}`}>Personal Details</h2>
            <div onClick={() => {
                setModalType("personal-details");
                setPersonalDetails(
                    {
                        fullName: resumeInfo.fullName,
                        jobTitle: resumeInfo.jobTitle,
                        address: resumeInfo.address,
                        phone: resumeInfo.phone,
                        email: resumeInfo.email
                    }
                )
                openModal(); // Open dialog for specific experience
            }} className="mt-5 p-4 flex flex-col gap-2 bg-slate-900 border cursor-pointer border-cyan-800 hover:bg-cyan-600 hover:bg-opacity-30">
                <h3 className="text-xs sm:text-sm font-semibold">
                    {resumeInfo.fullName ? `${resumeInfo.fullName}` : 'Enter Your Personal Details Here'}
                </h3>
                {resumeInfo.jobTitle && <p className="text-xs">
                    {resumeInfo.jobTitle}
                </p>}

            </div>
        </div>
    );
};

export default PersonalDetailsSection