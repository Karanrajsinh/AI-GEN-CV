"use client";

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Brain, LoaderCircle } from 'lucide-react';
import { useResumeInfo } from '@/src/context/ResumeInfoContext';
import { Textarea } from '@/components/ui/textarea';
import { MdOutlineEditNote } from 'react-icons/md';
import { AIChatSession } from '@/services/AIModal';
import { toast } from 'sonner';
import { editResume } from '@/services/supabase';

interface SummaryProps {
    summaryData: string | undefined;
    closeModal: () => void;
}

function SummeryForm({ summaryData, closeModal }: SummaryProps) {
    const { resumeInfo, setResumeInfo } = useResumeInfo();
    const [summary, setSummary] = useState<string | undefined>(summaryData || "");
    const [loading, setLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const example2 = `Professional finance client executive with over 15 years of experience in business development, relationship management, and portfolio and investment analysis. Skilled at educating clients and strategic partners on matters of portfolio optimization, securing and managing new business opportunities, and negotiating strategic partnerships. Excellent consultative approach with clients and stakeholders, and experience managing small teams, delivering quarterly earnings presentations, and collaborating cross-region with global finance organization.`
    const example1 = `Enterprise account executive with a strong background in hardware infrastructure, server/storage virtualization, and emerging cloud technologies. Typically manage quotas in excess of $10MM annually, with a history of exceeding sales targets, leading acquisition efforts, and creating innovative selling approaches in conjunction with in-house marketing as well as extensive partner networks. Experience managing small inside teams including inside sales representatives, customer success agents, and implementation teams. Strong hunter mentality with a relentless drive for setting and exceeding personal goals fore excellence.`
    const example = `Technical project manager with over seven years of experience managing both agile and waterfall projects for large technology organizations. Key strengths include budget management, contract and vendor relations, client-facing communications, stakeholder awareness, and cross-functional team management. Excellent leadership, organization, and communication skills, with special experience bridging large teams and providing process in the face of ambiguity.`
    const prompt = `Take this examples of resume summary as reference ${JSON.stringify([example, example1, example2])}  , create a summary from the given experiences : ${JSON.stringify(resumeInfo.experience)} , projects : ${JSON.stringify(resumeInfo.projects)},with no exaggerated words or sentences, containing only main key words from experiences and projects which reflects on impact of the summary in max 100 words   nothing else like proven this , developed this , proficient in this , known for this  and the start of the summary should start with  ${JSON.stringify(resumeInfo.jobTitle)} following with the comibined  duration of the expeirence in years  give response in text only like "your-response" nothing else `;


    const typeWriterEffect = (text: string, delay = 20) => {
        let index = -1;
        setSummary("");
        setIsTyping(true);
        const interval = setInterval(() => {
            if (index < text.length) {
                setSummary((prev) => (prev ? prev + text.charAt(index) : text.charAt(index)));
                index++;
            } else {
                clearInterval(interval);
                setIsTyping(false);
            }
        }, delay);
    };

    const GenerateSummaryFromAI = async () => {
        try {

            if (resumeInfo.experience.length < 1 || resumeInfo.projects.length < 1) return toast(`Needs At Least One Project And Experience To Generate Summary`)
            setLoading(true);
            const result = await AIChatSession.sendMessage(prompt);
            const response = result.response.text().replaceAll('"', '').replace(/.*summary:/, '') // Remove everything up to and including 'summary:'
                .replace(/[\{\}]/g, '')
                .trim();
            typeWriterEffect(response);
            setLoading(false);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setLoading(false)
            toast(`Error Generating In Summary Try Again`)
        }
    };

    const onSave = async () => {

        try {
            await editResume(resumeInfo.resume_id, { summary: summary })
            setResumeInfo((prev) => ({
                ...prev,
                summary: summary || '',
            }));

            closeModal();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast(`${error.message}`)
        }
    };

    return (
        <div>
            <div className='p-5 shadow-lg'>
                <div className=' items-center flex  gap-3 font-semibold'>
                    <MdOutlineEditNote className='text-2xl' /><span>Edit Summary</span>
                </div>
                <div className='flex justify-end items-center mt-6'>
                    <Button variant={'default'} type="button" size="sm" className="flex gap-2" onClick={GenerateSummaryFromAI} disabled={loading || isTyping}>
                        <Brain className='h-4 w-4' /> Generate from AI {loading && <LoaderCircle className='animate-spin' />}
                    </Button>
                </div>
                <Textarea className="mt-5 text-sm min-h-[250px]" required
                    placeholder='Write or generate a compelling summary of your career highlights and goals..'
                    spellCheck='true'
                    disabled={loading}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value || "")}
                />
                <div className='flex justify-end gap-6 mr-1 mt-6'>
                    <Button type='button' disabled={loading || isTyping} onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button className='bg-cyan-500 text-slate-950' disabled={loading || isTyping} onClick={onSave}>
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SummeryForm;
