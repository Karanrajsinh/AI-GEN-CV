"use client";
// import { FloatingDock } from "@/components/ui/floating-dock";
import {
    IconHome,
    IconNewSection,
    IconTerminal2,
    IconExchange,
    IconBrandGithub,
    IconBrandX,
} from "@tabler/icons-react";
import { Button } from "./button";
import { Dialog, DialogContent } from "./dialog";
import ResumePreview from "@/components/ResumePreview";
import PersonalDetail from "@/components/ResumeForm/PersonalDetailsForm";
import Summery from "@/components/ResumeForm/SummaryForm";
import EducationForm from "@/components/ResumeForm/EducationForm";
import ExperienceDetails from "@/components/ResumeForm/ExperienceForm";
import { useResumeInfo } from "@/context/ResumeInfoContext";
import { Education, Experience, PersonalDetails } from "@/Types/ResumeTypes";
import { FormEducation } from "@/Types/FormTypes";
import { FloatingDock } from "./floating-dock";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useModal } from "@/context/ModalContext";
import { useState } from "react";



export default function GridBackgroundDemo() {
    const { resumeInfo, setResumeInfo } = useResumeInfo();
    const { isOpen, openModal, closeModal, modalPrevent, dialogRef } = useModal() // Control open state of the Dialog
    const [modalType, setModalType] = useState('');
    const [modalIndex, setIndex] = useState<number>(0);
    const [education, setEducation] = useState<Education>(
        {
            universityName: '',
            degree: '',
            major: '',
            startDate: new Date().toISOString(),
            endDate: new Date().toISOString(),
        }
    );
    const [experience, setExperience] = useState<Experience>({
        city: '',
        companyName: '',
        currentlyWorking: false,
        endDate: new Date().toISOString(),
        startDate: new Date().toISOString(),
        id: 1,
        state: "",
        title: "",
        description: ""
    });
    const [personalDetails, setPersonalDetails] = useState<PersonalDetails>(
        {
            firstName: "",
            lastName: "",
            jobTitle: "",
            address: "",
            phone: "",
            email: ""
        }

    );
    const [summary, setSummary] = useState<string>();


    const links = [
        {
            title: "Home",
            icon: (
                <IconHome className="h-full w-full text-cyan-600" />
            ),
            href: "#",
        },

        {
            title: "Products",
            icon: (
                <IconTerminal2 className="h-full w-full text-cyan-600" />
            ),
            href: "#",
        },
        {
            title: "Components",
            icon: (
                <IconNewSection className="h-full w-full text-cyan-600" />
            ),
            href: "#",
        },
        {
            title: "Aceternity UI",
            icon: (
                <IconNewSection className="h-full w-full text-cyan-600" />
            ),
            href: "#",
        },
        {
            title: "Changelog",
            icon: (
                <IconExchange className="h-full w-full text-cyan-600" />
            ),
            href: "#",
        },

        {
            title: "Twitter",
            icon: (
                <IconBrandX className="h-full w-full text-cyan-600" />
            ),
            href: "#",
        },
        {
            title: "GitHub",
            icon: (
                <IconBrandGithub className="h-full w-full text-cyan-600" />
            ),
            href: "#",
        },
    ];

    const PersonalDetailsSection = () => {
        return (
            <div id="personal-details" className="p-5">
                <h2 className="text-xl font-bold text-white">Personal Details</h2>
                <div onClick={() => {
                    setModalType("personal-details");
                    setPersonalDetails(
                        {
                            firstName: resumeInfo.firstName,
                            lastName: resumeInfo.lastName,
                            jobTitle: resumeInfo.jobTitle,
                            address: resumeInfo.address,
                            phone: resumeInfo.phone,
                            email: resumeInfo.email
                        }
                    )
                    openModal(); // Open dialog for specific experience
                }} className="mt-5 p-4 bg-slate-900 border cursor-pointer border-cyan-800 hover:bg-cyan-600 hover:bg-opacity-30">
                    <h3 className="text-sm font-semibold">{resumeInfo.firstName} {resumeInfo.lastName}</h3>
                    <p className="text-xs">{resumeInfo.jobTitle}</p>
                </div>
            </div>
        );
    };

    // SummarySection.tsx
    const SummarySection = () => {
        return (
            <div onClick={() => {
                setModalType("summary");
                setSummary(resumeInfo.summary)
                openModal(); // Open dialog for specific experience
            }} className="p-5 cursor-pointer">
                <h2 className="text-xl font-bold text-white">Summary</h2>
                <div className="mt-5 p-4 bg-slate-900 border border-cyan-800 hover:bg-cyan-600 hover:bg-opacity-30">
                    <p className="text-xs">{resumeInfo.summary}</p>
                </div>
            </div>
        );
    };

    // Experience Section
    const ExperienceSection = () => {
        // const [experienceList, setExperienceList] = useState<FormExperience[]>();
        const addNewExperience = () => {
            const newExperience = {
                id: 5,
                title: '',
                companyName: '',
                city: '',
                state: '',
                startDate: new Date().toISOString(),
                endDate: new Date().toISOString(),
                description: '',
                currentlyWorking: false
            };
            // setExperienceList([...experienceList, newExperience]);
            setResumeInfo((prevResumeInfo) => ({
                ...prevResumeInfo,
                experience: [...prevResumeInfo.experience, newExperience]
            }))
            setIndex(resumeInfo.experience.length)
            setExperience(newExperience);
            setModalType('experience');
            openModal();
        };

        return (
            <div id="experience" className="p-5">
                <h2 className="text-xl font-bold text-white">Experience</h2>
                {resumeInfo.experience.map((exp: Experience, index: number) => (
                    <div
                        key={index}
                        onClick={() => {
                            setIndex(index);
                            setModalType("experience");
                            setExperience(exp);
                            openModal(); // Open dialog for specific experience
                        }}
                        className="mt-5 p-4 cursor-pointer bg-slate-900 border border-cyan-800 hover:bg-cyan-600 hover:bg-opacity-30"
                    >
                        <h3 className="text-sm font-semibold">{exp.companyName}</h3>
                        <p className="text-xs">{exp.title}</p>
                    </div>
                ))}
                <Button className="mt-5 text-xs rounded-lg text-white px-4 py-2 float-right" onClick={addNewExperience}>
                    Add New Experience
                </Button>
            </div>
        );
    };

    // Education Section
    const EducationSection = () => {
        const [educationalList, setEducationalList] = useState<FormEducation[]>([]);
        const AddNewEducation = () => {
            setEducationalList([
                ...educationalList,
                {
                    universityName: '',
                    degree: '',
                    major: '',
                    startDate: new Date().toISOString(),
                    endDate: new Date().toISOString(),
                },
            ]);
        };

        return (
            <div id="education" className="p-5">
                <h2 className="text-xl font-bold text-white">Education</h2>
                {resumeInfo?.education.map((edu: Education, index: number) => (
                    <div
                        key={index}
                        onClick={() => {
                            setIndex(index);
                            setModalType("education");
                            setEducation(edu);
                            openModal(); // Open dialog for specific education
                        }}
                        className="mt-5 p-4 bg-slate-900 border border-cyan-800 hover:bg-cyan-600 hover:bg-opacity-30"
                    >
                        <h3 className="text-sm font-semibold">{edu.universityName}</h3>
                        <p className="text-xs">{edu.degree}</p>
                    </div>
                ))}
                <Button onClick={AddNewEducation} className="mt-5 text-xs float-right rounded-lg text-white px-4 py-2">
                    Add New Education
                </Button>
            </div>
        );
    };


    // const handleGeneratePdf = async () => {
    //     try {
    //         const pdfElement = document.getElementById('pdf');
    //         if (pdfElement) {
    //             const htmlContent = pdfElement.outerHTML; // Get the outer HTML of the element

    //             // Optionally extract styles
    //             const styles = Array.from(document.styleSheets).map(styleSheet => {
    //                 try {
    //                     return Array.from(styleSheet.cssRules).map(rule => rule.cssText).join('\n');
    //                 } catch (e) {
    //                     // Ignore stylesheets from different origins
    //                     console.warn('Could not access stylesheet:', styleSheet.href);
    //                     return e;
    //                 }
    //             }).join('\n');

    //             // Wrap the HTML content with the necessary <html> structure and styles
    //             const fullHtmlContent = `
    //                 <!DOCTYPE html>
    //                 <html>
    //                     <head>
    //                         <style>${styles}</style> <!-- Include styles here -->
    //                     </head>
    //                     <body>${htmlContent}</body>
    //                 </html>
    //             `;

    //             // Call the API to generate PDF
    //             const response = await fetch('https://resume-builder-delta-eight.vercel.app/api/generatePdf', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({ htmlContent: fullHtmlContent }), // Pass the HTML content directly
    //             });

    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }

    //             // Create a blob from the PDF response
    //             const blob = await response.blob();
    //             const pdfUrl = window.URL.createObjectURL(blob);

    //             // Create a link element to download the PDF
    //             const link = document.createElement('a');
    //             link.href = pdfUrl;
    //             link.setAttribute('download', 'document.pdf'); // Specify the filename
    //             document.body.appendChild(link);
    //             link.click();
    //             if (link.parentNode)
    //                 link?.parentNode.removeChild(link); // Clean up the link
    //         } else {
    //             console.error('Element with ID "pdf" not found');
    //         }
    //     } catch (error) {
    //         console.error('Error generating PDF:', error);
    //     }
    // };



    const handleGeneratePdf = async () => {
        try {
            const pdfElement = document.getElementById('pdf');
            if (pdfElement) {
                const htmlContent = pdfElement.outerHTML; // Get the HTML content of the element

                const response = await fetch('http://<YOUR-NODE-SERVER-DOMAIN>/generatePdf', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ htmlContent }), // Send the HTML content to the server
                });

                if (!response.ok) {
                    throw new Error('Failed to generate PDF');
                }

                // Create a blob from the response (PDF) and download it
                const blob = await response.blob();
                const pdfUrl = window.URL.createObjectURL(blob);

                // Create a download link
                const link = document.createElement('a');
                link.href = pdfUrl;
                link.setAttribute('download', 'document.pdf'); // Set the filename
                document.body.appendChild(link);
                link.click();
                link.remove(); // Clean up the link
            } else {
                console.error('Element with ID "pdf" not found');
            }
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };





    return (
        <div className="h-screen w-screen dark:bg-black bg-slate-950 flex justify-between dark:bg-dot-white/[0.2] bg-grid-cyan-800/[0.2]">
            <div className="flex text-white gap-4 items-start justify-start min-h-screen bg-slate-950 w-max">
                <FloatingDock desktopClassName="bg-transparent scroll-smooth" items={links} />
                <div
                    className="flex flex-col gap-12 w-[400px] max-h-screen overflow-y-scroll border-l border-l-cyan-800 custom-scrollbar"
                    style={{ scrollBehavior: "smooth" }}
                >
                    <PersonalDetailsSection />

                    <hr className="border mx-auto border-cyan-600 min-w-[90%]" />
                    <SummarySection />
                    <hr className="border mx-auto border-cyan-600 min-w-[90%]" />
                    <ExperienceSection />
                    <hr className="border mx-auto border-cyan-600 min-w-[90%]" />
                    <EducationSection />
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div className="h-[90vh]  my-auto overflow-hidden border border-cyan-600 bg-slate-900 bg-dot-cyan-900">
                    <TransformWrapper
                        smooth={true}
                        limitToBounds={false}           // Constrain the zoom to within bounds
                        initialPositionX={150}
                        initialPositionY={50}
                        initialScale={0.65}            // Initial zoom out
                        maxScale={5}                   // Limit max zoom to prevent overly large zoom
                        minScale={0.5}                 // Allow zooming out to 50% of the size
                        wheel={{                       // Configure mouse wheel zoom behavior
                            step: 0.8,                   // Set the zoom step to make zooming smoother
                            wheelDisabled: false,          // Enable zooming with the mouse wheel
                            touchPadDisabled: false,       // Enable zooming with touchpad gestures
                        }}
                        velocityAnimation={
                            {
                                disabled: false,
                                animationTime: 10,
                                animationType: 'easeInCubic'

                            }}
                        panning={{ disabled: false }}  // Enable panning so that zoomed content can be moved
                    >
                        <TransformComponent>
                            <ResumePreview />
                        </TransformComponent>
                    </TransformWrapper>
                </div>
                <Button className="w-min" onClick={handleGeneratePdf}
                >Download Pdf </Button>
            </div>

            {/* Dialog Component for displaying modal content */}
            <Dialog open={isOpen} onOpenChange={() => {
                if (modalPrevent) openModal();
                else closeModal();

            }
            }>
                <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} style={{ borderRadius: "0px" }} ref={dialogRef} className="bg-slate-900 border min-w-max text-white border-cyan-800 m-0 p-0 modal">
                    {modalType === "experience" && <ExperienceDetails experienceData={experience} index={modalIndex} />}
                    {modalType === "education" && <EducationForm educationData={education} index={modalIndex} />}
                    {modalType === "summary" && <Summery summaryData={summary} />}
                    {modalType === "personal-details" && <PersonalDetail initialData={personalDetails} />}
                </DialogContent>
            </Dialog>
        </div >
    );
}

