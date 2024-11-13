// import { Dialog, DialogContent } from "../../components/ui/dialog";

// function ResumeModal() {
//     return (
//         <Dialog open={isOpen} onOpenChange={() => {
//             if (modalPrevent) openModal();
//             else closeModal();

//         }
//         }>
//             <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} style={{ borderRadius: "0px" }} className="bg-slate-900 border min-w-max text-white border-cyan-800 m-0 p-0 modal">
//                 {modalType === "experience" && <ExperienceDetails experienceData={experience} index={modalIndex} />}
//                 {modalType === "education" && <EducationForm educationData={education} index={modalIndex} />}
//                 {modalType === "project" && <ProjectForm projectData={project} index={modalIndex} />}
//                 {modalType === "summary" && <Summery summaryData={summary} />}
//                 {modalType === "personal-details" && <PersonalDetail initialData={personalDetails} />}
//             </DialogContent>
//         </Dialog>
//     )
// }