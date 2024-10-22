// import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';
// import { useResumeInfo } from '@/src/context/ResumeInfoContext';
// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// // import GlobalApi from './../../../../../service/GlobalApi';
// import { Brain, LoaderCircle } from 'lucide-react';
// import { toast } from 'sonner';
// // import { AIChatSession } from './../../../../../service/AIModal';

// // Define the structure of the AI-generated summary


// function Summery({ enabledNext }: { enabledNext: (value: boolean) => void }) {
//     const { resumeInfo, setResumeInfo } = useResumeInfo();
//     const [summary, setSummary] = useState<string | undefined>(resumeInfo?.summary || " ");
//     const [loading, setLoading] = useState(false);
//     const params = useParams<{ resumeId: string }>();
//     // const [aiGeneratedSummaryList, setAiGenerateSummaryList] = useState<AIGeneratedSummary[] | undefined>();

//     const prompt = "Job Title: {jobTitle} , Depends on job title give me list of summary for 3 experience level, Mid Level and Fresher level in 3 -4 lines in array format, With summary and experience_level Field in JSON Format";

//     useEffect(() => {
//         if (summary && setResumeInfo) {
//             setResumeInfo((prev) => ({
//                 ...prev,
//                 // summary: summary,
//                 summary: summary === "" ? "" : summary,
//             }));
//         }
//     }, [summary, setResumeInfo]);

//     // const GenerateSummaryFromAI = async () => {
//     //     setLoading(true);
//     //     const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle || '');
//     //     console.log(PROMPT);
//     //     const result = await AIChatSession.sendMessage(PROMPT);
//     //     console.log(JSON.parse(result.response.text()));

//     //     setAiGenerateSummaryList(JSON.parse(result.response.text()));
//     //     setLoading(false);
//     // };

//     const onSave = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         setLoading(true);
//         const data = {
//             data: {
//                 summary: summary,
//             },
//         };

//         // try {
//         //     const resp = await GlobalApi.UpdateResumeDetail(params?.resumeId, data);
//         //     console.log(resp);
//         //     enabledNext(true);
//         //     toast("Details updated");
//         // } catch (error) {
//         //     console.error(error);
//         //     toast("Error updating details");
//         // } finally {
//         //     setLoading(false);
//         // }
//     };

//     return (
//         <div>
//             <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
//                 <h2 className='font-bold text-lg'>Summary</h2>
//                 <p>Add Summary for your job title</p>

//                 <form className='mt-7' onSubmit={onSave}>
//                     <div className='flex justify-between items-end'>
//                         <label>Add Summary</label>
//                         <Button
//                             type="button" size="sm" className="flex gap-2">
//                             <Brain className='h-4 w-4' />  Generate from AI
//                         </Button>
//                     </div>
//                     <Textarea className="mt-5" required
//                         value={summary}
//                         onChange={(e) => setSummary(e.target.value || " ")}
//                     />
//                     <div className='mt-2 flex justify-end'>
//                         <Button type="submit" disabled={loading}>
//                             {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
//                         </Button>
//                     </div>
//                 </form>
//             </div>

//             {/* {aiGeneratedSummaryList && (
//                 <div className='my-5'>
//                     <h2 className='font-bold text-lg'>Suggestions</h2>
//                     {aiGeneratedSummaryList.map((item, index) => (
//                         <div key={index}
//                             onClick={() => setSummary(item.summary)}
//                             className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
//                             <h2 className='font-bold my-1 text-primary'>Level: {item.experience_level}</h2>
//                             <p>{item.summary}</p>
//                         </div>
//                     ))}
//                 </div>
//             )} */}
//         </div>
//     );
// }

// export default Summery;

"use client"
import { Button } from '../../../components/ui/button';

import { useEffect, useState } from 'react';
import { Brain, LoaderCircle } from 'lucide-react';
// import { toast } from 'sonner';
import { useResumeInfo } from '../../context/ResumeInfoContext';
import { Textarea } from '../../../components/ui/textarea';

interface SummaryProps {
    summaryData: string | undefined; // Prop to get initial summary
}

function Summery({ summaryData }: SummaryProps) {
    const { setResumeInfo } = useResumeInfo(); // Using the context to update resume info
    const [summary, setSummary] = useState<string | undefined>(summaryData || " ");
    const [loading, setLoading] = useState(false);
    const [aiGeneratedSummaryList, setAiGenerateSummaryList] = useState<{ summary: string; experience_level: string }[] | undefined>();

    const prompt = "Job Title: {jobTitle}, Depends on job title give me list of summary for 3 experience levels: Senior, Mid Level, and Fresher. Provide 3-4 lines in array format with summary and experience_level fields in JSON Format";

    // Sync the initial summaryData from props
    useEffect(() => {
        if (summaryData) {
            setSummary(summaryData);
        }
    }, [summaryData]);

    // Update resume info when the summary changes
    useEffect(() => {
        setResumeInfo((prev) => ({
            ...prev,
            summary: summary === "" ? "" : summary,
        }));
    }, [summary, setResumeInfo]);

    const GenerateSummaryFromAI = async () => {
        setLoading(true);
        // This prompt can be updated as per the provided job title
        const PROMPT = prompt.replace('{jobTitle}', 'Developer'); // Replace 'Developer' with actual job title if required
        console.log(PROMPT);

        // Uncomment this to fetch AI-generated summaries
        // const result = await AIChatSession.sendMessage(PROMPT);
        // const aiGeneratedSummaries = JSON.parse(result.response.text());
        // setAiGenerateSummaryList(aiGeneratedSummaries);
        setLoading(false);
    };

    const onSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            data: {
                summary: summary,
            },
        };

        // Add your API call logic here to save the summary
        // try {
        //     const resp = await GlobalApi.UpdateResumeDetail(params?.resumeId, data);
        //     console.log(resp);
        //     enabledNext(true);
        //     toast("Details updated");
        // } catch (error) {
        //     console.error(error);
        //     toast("Error updating details");
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <div>
            <div className='p-5 shadow-lg'>
                <h2 className='font-bold text-lg'>Summary</h2>
                <form className='mt-7' onSubmit={onSave}>
                    <div className='flex justify-between items-end'>
                        <label>Add Summary</label>
                        <Button variant={'default'} type="button" size="sm" className="flex gap-2" onClick={GenerateSummaryFromAI}>
                            <Brain className='h-4 w-4' /> Generate from AI
                        </Button>
                    </div>
                    <Textarea className="mt-5 min-h-[250px]" required
                        value={summary}
                        onChange={(e) => setSummary(e.target.value || " ")}
                    />
                    <div className='mt-2 flex justify-end'>
                        <Button type="submit" disabled={loading}>
                            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>

            {/* Uncomment this section if you want to display AI-generated suggestions */}
            {/* {aiGeneratedSummaryList && (
          <div className='my-5'>
            <h2 className='font-bold text-lg'>Suggestions</h2>
            {aiGeneratedSummaryList.map((item, index) => (
              <div key={index}
                onClick={() => setSummary(item.summary)}
                className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                <h2 className='font-bold my-1 text-primary'>Level: {item.experience_level}</h2>
                <p>{item.summary}</p>
              </div>
            ))}
          </div>
        )} */}
        </div>
    );
}

export default Summery;
