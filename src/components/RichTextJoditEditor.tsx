import React, { useState } from "react";
import "jodit";
import JoditEditor from "jodit-react";
import { useResumeInfo } from "../context/ResumeInfoContext";
import { Button } from "@/components/ui/button";
import { Brain, LoaderCircle } from "lucide-react";
import { AIChatSession } from '@/services/AIModal'
import 'jodit/es2021/jodit.min.css'
const buttons = [
    "undo",
    "redo",
    "|",
    "bold",
    "strikethrough",
    "underline",
    "italic",
    "|",
    "align",
    "|",
    "ul",
    "ol",
    "|",
    "link",
    "|",
    "hr",
    "eraser",
    "copyformat",
    "|",
    "fullsize",
    "selectall",
    "|"
];


const editorConfig = {
    disablePlugins: 'add-new-line',
    readonly: false,
    toolbar: true,
    spellcheck: true,
    language: "en",
    // toolbarButtonSize: "medium",
    toolbarAdaptive: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    //defaultActionOnPaste: "insert_clear_html",
    buttons: buttons,
    uploader: {
        insertImageAsBase64URI: true,
    },
    width: 800,
    height: 400,
    theme: "summer"
};



type EditorProps = {
    index: number,
    defaultValue: string,
}

const PROMPT = 'position title: {positionTitle}, Depends on position title give me 5-7 bullet points for my experience in resume (Please do not  position title or add experience level and No JSON array), give me result in HTML tag <p> and only the summary should be the output';

export default function RichTextJoditEditor({ index, defaultValue }: EditorProps) {
    const { resumeInfo, setResumeInfo } = useResumeInfo();
    const [data, setData] = useState(defaultValue);
    const [loading, setLoading] = useState(false);


    const GenerateSummeryFromAI = async () => {
        const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);

        const result = await AIChatSession.sendMessage(prompt);
        const resp = result.response.text();
        console.log(resp);
        setData(resp.replace('[', '').replace(']', ''));
        // setLoading(false);
    };


    const handleEditorChange = (newContent: string) => {
        // Create a copy of the experience list
        setData(newContent);
        const updatedExperienceList = [...(resumeInfo?.experience || [])];

        // Update the workSummary at the correct index
        updatedExperienceList[index] = {
            ...updatedExperienceList[index],
            workSummary: newContent,
        };

        // Set the local state (data) and update experienceList in resumeInfo
        setResumeInfo((prevResumeInfo) => ({
            ...prevResumeInfo,
            experience: updatedExperienceList,
        }));
    };


    return (
        <div>
            <div className='flex justify-between my-2'>
                <label className='text-xs'>Summary</label>
                <Button size="sm"
                    onClick={GenerateSummeryFromAI}
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
            <div
                id="editor"
                className="App"
                style={{ maxWidth: editorConfig.width, margin: "0 auto", border: "2px solid darkcyan" }}
            >
                <JoditEditor
                    className="text-black"
                    value={data}
                    config={editorConfig}
                    onChange={(newContent) => handleEditorChange(newContent)}
                />
            </div>
        </div>
    );
}

