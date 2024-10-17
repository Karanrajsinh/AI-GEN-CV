import { format } from "date-fns";
import { Project } from "@/src/Types/ResumeTypes";

// Define the type for resumeInfo
type ResumeInfo = {
    themeColor: string;
    projects: Project[];
};

// Define the props type
type ProjectPreviewProps = {
    resumeInfo: ResumeInfo;
};

function ProjectPreview({ resumeInfo }: ProjectPreviewProps) {
    return (
        <div className="my-6">
            <h2
                className="text-center font-bold text-sm mb-2"
                style={{ color: resumeInfo?.themeColor }}
            >
                Projects
            </h2>
            <hr style={{ borderColor: resumeInfo?.themeColor }} />

            {resumeInfo?.projects?.map((project, index) => (
                <div key={index} className="my-5">
                    <h2
                        className="text-sm font-bold"
                        style={{ color: resumeInfo?.themeColor }}
                    >
                        {project?.name}
                    </h2>
                    <div className="text-xs flex justify-between">
                        <span>{project?.description}</span>
                        <span
                            className="font-semibold"
                            style={{ color: resumeInfo?.themeColor }}
                        >
                            {project?.startDate
                                ? format(new Date(project.startDate), 'MMM yyyy')
                                : 'N/A'}
                            <span className="mx-1">-</span>
                            {project?.currentlyWorking
                                ? 'Present'
                                : project?.endDate
                                    ? format(new Date(project.endDate!), 'MMM yyyy')
                                    : 'N/A'}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProjectPreview;
