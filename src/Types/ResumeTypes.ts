// src/types.ts

export type PersonalDetails =
    {
        firstName: string,
        lastName: string,
        jobTitle: string,
        address: string,
        phone: string,
        email: string
    }


export type Experience = {
    id: number;
    title: string;
    companyName: string;
    city: string;
    state: string;
    startDate: Date | string;
    endDate: Date | string;
    currentlyWorking: boolean;
    description: string;
};


export type Project = {
    id: number;
    name: string;
    description: string;
    startDate: string | Date;
    endDate: string | Date; // Optional if the project is ongoing
    currentlyWorking: boolean; // Optional flag for ongoing projects
};


export type Education = {
    id?: number;
    universityName: string;
    degree: string;
    major: string;
    startDate: Date | string;
    endDate: Date | string;
};

export type Skill = {
    id?: number;
    name: string;
};

export type ResumeInfo = {
    themeColor: string;
    firstName: string;
    lastName: string;
    jobTitle: string;
    address: string;
    phone: string;
    email: string;
    summary: string | undefined;
    experience: Experience[];
    education: Education[];
    skills: Skill[];
    projects: Project[];
    // Allow dynamic fields of string type
    /*eslint-disable-next-line*/
    [key: string]: any;
};



