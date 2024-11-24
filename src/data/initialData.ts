// Default Experience Object

export const personalDetailsDefault =
{
    fullName: "",
    jobTitle: "",
    address: "",
    phone: "",
    email: ""
}



export const experienceDefault = {
    id: "",
    isVisible: true,
    title: '',
    companyName: '',
    location: '',
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    currentlyWorking: false,
    description: '',
    skillPrompt: '',
    rolePrompt: ''
};

// Default Project Object
export const projectDefault = {
    id: "",
    isVisible: true,
    name: '',
    description: '',
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    currentlyWorking: false,
    skillPrompt: '',
    rolePrompt: ''
};

// Default Education Object
export const educationDefault = {
    id: "",
    isVisible: true,
    universityName: '',
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    degree: '',
    major: ''
};

// Default Skill Object
export const skillDefault = {
    id: "",
    isVisible: true,
    name: ''
};

export const certificateDefault =
{
    id: "",
    name: '',
    issuer: '',
    issueDate: new Date().toISOString(),
    website: '',
    isVisible: true
}


export const languageDefault = {
    id: "",
    isVisible: true,
    name: "",
    proficientLevel: "None",
};


export const resumeDefault =
{
    resume_id: '',
    resume_name: '',
    sampleResume: false
}


export const resumeInfoDefault = {
    resume_id: '',
    fullName: '',
    jobTitle: '',
    address: '',
    phone: '',
    email: '',
    themeColor: '#4d4d4d',
    summary: '',
    summaryVisible: true,
    isExperienceVisible: true,
    isProjectVisible: true,
    isEducationVisible: true,
    isSkillVisible: true,
    isCertificateVisible: true,
    isLanguageVisible: true,
    experience: [],
    projects: [],
    education: [],
    skills: [],
    languages: [],
    certificates: []
}