"use client"

import { Button } from '@/components/ui/button';
import { useResumeInfo } from '@/src/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, ContentEditableEvent, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg';
// import { AIChatSession } from './../../../../service/AIModal';
import { toast } from 'sonner';

// Define the props type for RichTextEditor component
type RichTextEditorProps = {
    onRichTextEditorChange: (e: ContentEditableEvent) => void;
    index: number;
    defaultValue: string;
};

const PROMPT = 'position title: {positionTitle}, Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experience level and No JSON array), give me result in HTML tags';

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }: RichTextEditorProps) {
    const [value, setValue] = useState<string>(defaultValue);
    const { resumeInfo, setResumeInfo } = useResumeInfo()
    const [loading, setLoading] = useState(false);

    // const GenerateSummeryFromAI = async () => {
    //     if (!resumeInfo?.experience[index]?.title) {
    //         toast('Please Add Position Title');
    //         return;
    //     }
    //     setLoading(true);
    //     const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);

    //     const result = await AIChatSession.sendMessage(prompt);
    //     const resp = result.response.text();
    //     setValue(resp.replace('[', '').replace(']', ''));
    //     setLoading(false);
    // };

    return (
        <div>
            <div className='flex justify-between my-2'>
                <label className='text-xs'>Summary</label>
                <Button
                    variant="default"
                    // onClick={GenerateSummeryFromAI}
                    disabled={loading}
                    className="flex gap-2">
                    {loading ? (
                        <LoaderCircle className='animate-spin' />
                    ) : (
                        <>
                            <Brain className='h-4 w-4' /> Generate from AI
                        </>
                    )}
                </Button>
            </div>
            <EditorProvider>
                <Editor value={value} onChange={(e) => {
                    setValue(e.target.value);
                    onRichTextEditorChange(e);
                }}>
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    );
}

export default RichTextEditor;
