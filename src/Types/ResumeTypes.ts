// src/types.ts

export type PersonalDetails =
    {
        fullName: string,
        jobTitle: string,
        address: string,
        phone: string,
        email: string
    }

export type Experience = {
    id: string;
    isVisible: boolean,
    title: string;
    companyName: string;
    location: string;
    startDate: Date | string;
    endDate: Date | string;
    currentlyWorking: boolean;
    skillPrompt: string,
    rolePrompt: string,
    description: string;

};


export type Project = {
    id: string;
    isVisible: boolean,
    name: string;
    skillPrompt: string,
    rolePrompt: string,
    description: string;
    startDate: string | Date;
    endDate: string | Date;
    currentlyWorking: boolean;
    website: string
};


export type Education = {
    id: string;
    isVisible: boolean,
    universityName: string;
    degree: string;
    major: string;
    startDate: Date | string;
    endDate: Date | string;
};

export type Skill = {
    id: string,
    isVisible: boolean,
    name: string
};


export type Certificate = {
    id: string,
    isVisible: boolean,
    name: string;
    issuer: string;
    issueDate: Date | string;
    website: string
}

export type Language = {
    id: string;
    isVisible: boolean;
    name: string;
    proficientLevel: string;
};

export type ResumeInfo = {
    resume_id: string,
    themeColor: string;
    fullName: string;
    jobTitle: string;
    address: string;
    phone: string;
    email: string;
    summary: string;
    summaryVisible: boolean;
    isExperienceVisible: boolean,
    isProjectVisible: boolean,
    isEducationVisible: boolean,
    isSkillVisible: boolean,
    isCertificateVisible: boolean,
    isLanguageVisible: boolean;
    experience: Experience[];
    education: Education[];
    skills: Skill[];
    projects: Project[];
    certificates: Certificate[];
    languages: Language[];
    // Allow dynamic fields of string type
    /*eslint-disable-next-line*/
    [key: string]: any;
};



export type Resume =
    {
        resume_id: string
        resume_name: string,
        sampleResume: boolean
    }