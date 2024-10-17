"use client"

import React, { createContext, useState, ReactNode } from 'react';
import { ResumeInfo } from '@/src/Types/ResumeTypes';  // Import your existing type
import { resumeData } from '../data/dummyData';

// Define the context type
type ResumeInfoContextType = {
    resumeInfo: ResumeInfo;
    setResumeInfo: React.Dispatch<React.SetStateAction<ResumeInfo>>;
};

// Create the context with an initial value of null
const ResumeInfoContext = createContext<ResumeInfoContextType | null>(null);

// Provide the context to the component tree
export const ResumeInfoProvider = ({ children }: { children: ReactNode }) => {
    // Create a state for resumeInfo with initial default values or empty object
    const [resumeInfo, setResumeInfo] = useState<ResumeInfo>(resumeData);
    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            {children}
        </ResumeInfoContext.Provider>
    );
};

// Export the context for use in components
export const useResumeInfo = () => {
    const context = React.useContext(ResumeInfoContext);
    if (!context) {
        throw new Error('useResumeInfo must be used within a ResumeInfoProvider');
    }
    return context;
};
