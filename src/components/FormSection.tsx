"use client"

import React, { useEffect, useState } from 'react';
import PersonalDetail from '../components/ResumeForm/PersonalDetail';
import { Button } from '../../components/ui/button';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import Summery from '../components/ResumeForm/Summary';
import Experience from '../components/ResumeForm/Experience';
import Education from '../components/ResumeForm/Education';
import Skills from '../components/ResumeForm/Skills';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// import ThemeColor from './ThemeColor';

// Define the parameter type for URL params


function FormSection() {
    const route = useRouter();
    // Type state correctly
    const [activeFormIndex, setActiveFormIndex] = useState<number>(1);
    const [enableNext, setEnableNext] = useState<boolean>(true);

    // Type for params object from `useParams`
    const { resumeId } = useParams();

    useEffect(() => {
        if (activeFormIndex === 6 && resumeId) {
            route.push(`/my-resume/${resumeId}/view`);
        }
    }, [activeFormIndex, resumeId, route]);

    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="flex gap-5">
                    <Link href="/dashboard">
                        <Button><Home /></Button>
                    </Link>
                    {/* <ThemeColor /> */}
                </div>

                <div className="flex gap-2">
                    {activeFormIndex > 1 && (
                        <Button
                            size="sm"
                            onClick={() => setActiveFormIndex(activeFormIndex - 1)}
                        >
                            <ArrowLeft />
                        </Button>
                    )}

                    <Button
                        disabled={!enableNext}
                        className="flex gap-2"
                        size="sm"
                        onClick={() => setActiveFormIndex(activeFormIndex + 1)}
                    >
                        Next <ArrowRight />
                    </Button>
                </div>
            </div>

            {activeFormIndex === 1 ? (
                <PersonalDetail enabledNext={(v: boolean) => setEnableNext(v)} />
            ) : activeFormIndex === 2 ? (
                <Summery enabledNext={(v: boolean) => setEnableNext(v)} />
            ) : activeFormIndex === 3 ? (
                <Experience />
            ) : activeFormIndex === 4 ? (
                <Education />
            ) : activeFormIndex === 5 ? (
                <Skills />
            ) : null}
        </div>
    );
}

export default FormSection;
