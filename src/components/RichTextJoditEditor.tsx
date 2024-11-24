"use client"

import React, { useMemo, useRef, useState } from "react";
import dynamic from 'next/dynamic';
const JoditEditor = dynamic(() => import('jodit-react'), {
    ssr: false, // Prevent server-side rendering for this component
});
import { Button } from "../../components/ui/button";
import { Brain, LoaderCircle } from "lucide-react";
import { AIChatSession } from '../../services/AIModal'
import 'jodit/es2021/jodit.min.css'
import { toast } from "sonner";
import { Experience, Project } from "../Types/ResumeTypes";
import { Jodit } from "jodit-react";

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
    "|",
    "eraser",
    "copyformat",
    "|",
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



type EditorProps =
    {
        setLoadingData: React.Dispatch<React.SetStateAction<boolean>>
        setSummary: React.Dispatch<React.SetStateAction<string>>,
        setMessagePrompt: React.Dispatch<React.SetStateAction<string>>,
        contentType: string,
        defaultValue: string,
        skillPrompt: string,
        rolePrompt: string
        experienceData?: Experience
        projectData?: Project
    }




export default function RichTextJoditEditor({ setLoadingData, experienceData, projectData, contentType, defaultValue, skillPrompt, rolePrompt, setSummary, setMessagePrompt }: EditorProps) {
    const editor = useRef<Jodit>(null);
    const [data, setData] = useState(defaultValue);
    const [isTyping, setIsTyping] = useState(false);

    const experiencePrompt = `From ${experienceData?.skillPrompt} and ${experienceData?.rolePrompt} With Positon ${experienceData?.title} At Company ${experienceData?.companyName} create a summary of this experience in html tags only which is <p>'your response here'</p> no any other commmas or format should be used to generate the response and not to cover the response with any word , symbol or char just response between the html tags nothing else ,it should contain the main key words of the experience and the summary should be in normal words yet professional and simple words like how a person will explain his experience in a professional  conversation  `

    const projectPrompt = `From ${projectData?.skillPrompt} and ${projectData?.rolePrompt} With Project ${projectData?.name} create a summary of this project in html tags only which is <p>'your response here'</p> no any other commas or format should be used to generate the response and not to cover the response with any word, symbol or char just response between the html tags nothing else, it should contain the main keywords of the project and the summary should be in normal yet professional and simple words like how a person will explain their project to someone in a casual conversation.`;

    const typeWriterEffect = (htmlContent: string, delay = 20) => {

        let index = 0;
        let tempContent = "";
        setIsTyping(true);
        setLoadingData(true)
        const interval = setInterval(() => {
            if (index < htmlContent.length) {
                tempContent += htmlContent.charAt(index);
                setData(tempContent);
                // Update the display in a different element if desired
                index++;
            } else {
                clearInterval(interval);
                setIsTyping(false);
                setLoadingData(false)
                if (editor.current) {
                    editor.current.value = tempContent; // Set the editor content with `value`
                }

            }

        }, delay);

    };



    const [loading, setLoading] = useState(false);
    const config = useMemo(
        () => ({
            limitChars: 750,
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
            height: 'fit-content',
            maxHeight: 500,
        }),
        []
    );



    const GenerateSummaryFromAI = async () => {
        try {
            if (skillPrompt === '' || rolePrompt === '') return setMessagePrompt('Prompt Is Required To Generate Summary')
            setLoading(true)
            const prompt = contentType === "experience" ? experiencePrompt : projectPrompt;
            const result = await AIChatSession.sendMessage(prompt);
            const response = result.response.text().replaceAll('"', '').replace(/.*summary:/, '')
                .replace(/[\{\}]/g, '')
                .trim();
            setSummary(response)
            typeWriterEffect(response.replace('[', '').replace(']', '').replaceAll('"', ''));
            setLoading(false)
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        catch (err) {
            toast(`Error Occured in Generating Summary! , Try Again`)
            setLoading(false)
            setLoadingData(false)
        }
    };


    const handleEditorChange = (newContent: string) => {
        setData(newContent);
        setSummary(newContent)

    };

    return (
        <div>
            <div className='flex items-end justify-between my-2'>
                <label className='text-sm'>Description</label>
                <Button variant={'default'} type="button" size="sm" className="flex gap-2" onClick={GenerateSummaryFromAI} disabled={loading || isTyping}>
                    <Brain className='h-4 w-4' /> Generate from AI {loading && <LoaderCircle className='animate-spin' />}
                </Button>
            </div>
            <div
                id="editor"
                className="App"
                style={{ maxWidth: editorConfig.width, margin: "0 auto" }}
            >
                <JoditEditor

                    ref={editor}
                    className="text-black text-sm sm:text-base"
                    config={config}
                    value={data}
                    onChange={(newContent) => handleEditorChange(newContent)}
                />
            </div>
        </div>
    );
}

