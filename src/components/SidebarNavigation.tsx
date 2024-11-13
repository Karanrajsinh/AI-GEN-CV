import { FloatingDock } from "@/components/ui/floating-dock";
import { BiSolidUserDetail } from "react-icons/bi";
import { AiOutlineProject } from "react-icons/ai";
import { RiGraduationCapLine } from "react-icons/ri";
import { PiListBulletsFill, PiCertificate } from "react-icons/pi";
import { MdOutlineSummarize, MdOutlineWorkOutline } from "react-icons/md";
import { IoLanguageSharp } from "react-icons/io5";

function SidebarNavigation() {
    const links = [
        {
            title: "Personal Details",
            icon: <BiSolidUserDetail className="text-2xl text-cyan-600" />,
            target: "personal-details",
        },
        {
            title: "Summary",
            icon: <MdOutlineSummarize className="text-2xl text-cyan-600" />,
            target: "summary",
        },
        {
            title: "Experience",
            icon: <MdOutlineWorkOutline className="text-2xl text-cyan-600" />,
            target: "experience",
        },
        {
            title: "Project",
            icon: <AiOutlineProject className="text-2xl text-cyan-600" />,
            target: "project",
        },
        {
            title: "Education",
            icon: <RiGraduationCapLine className="text-2xl text-cyan-600" />,
            target: "education",
        },
        {
            title: "Skill",
            icon: <PiListBulletsFill className="text-2xl text-cyan-600" />,
            target: "skill",
        },
        {
            title: "Certificate",
            icon: <PiCertificate className="text-2xl text-cyan-600" />,
            target: "certificate",
        },
        {
            title: "Language",
            icon: <IoLanguageSharp className="text-2xl text-cyan-600" />,
            target: "language",
        },
    ];

    return (
        <FloatingDock
            items={links} // Pass the links array
            desktopClassName="bg-transparent  scroll-smooth"
            mobileClassName="hidden"
        />
    );
}

export default SidebarNavigation;
