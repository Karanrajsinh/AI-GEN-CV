"use client"

import React, { useState } from "react";
import "jodit";
// import JoditEditor from "jodit-react";
import dynamic from 'next/dynamic';

// Dynamically import JoditEditor
const JoditEditor = dynamic(() => import('jodit-react'), {
    ssr: false, // Prevent server-side rendering for this component
});
import { useResumeInfo } from "../context/ResumeInfoContext";
import { Button } from "../../components/ui/button";
import { Brain, LoaderCircle } from "lucide-react";
import { AIChatSession } from '../../services/AIModal'
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
    toolbarAdaptive: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    buttons: buttons,
    width: 800,
    height: 400,
};



type EditorProps = {
    contentType: string,
    index: number,
    defaultValue: string,
}

const PROMPT = 'position title: {positionTitle}, Depends on position title give me 5-7 bullet points for my experience in resume, give me result in <ul><li></li></ul> where li will be each point the response starts with html <ul> tag and ends with html </ul> enclosing tag no semilcolon ,or wrapping response in "" ';

export default function RichTextJoditEditor({ contentType, index, defaultValue }: EditorProps) {
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
        const updatedList = [...(resumeInfo[contentType] || [])];

        // Update the description at the correct index
        updatedList[index] = {
            ...updatedList[index],
            description: newContent,
        };

        // Set the local state (data) and update List in resumeInfo
        setResumeInfo((prevResumeInfo) => ({
            ...prevResumeInfo,
            [contentType]: updatedList,
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
                    className="text-black z-[999]"
                    config={editorConfig}
                    value={data}
                    onChange={(newContent) => handleEditorChange(newContent)}
                />
            </div>
        </div>
    );
}

