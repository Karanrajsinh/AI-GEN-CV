// Default Experience Object

export const personalDetailsDefault =
{
    firstName: "",
    lastName: "",
    jobTitle: "",
    address: "",
    phone: "",
    email: ""
}



export const experienceDefault = {
    id: 0,
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
    id: 0,
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
    id: 0,
    isVisible: true,
    universityName: '',
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    degree: '',
    major: ''
};

// Default Skill Object
export const skillDefault = {
    id: 0,
    isVisible: true,
    name: ''
};

export const certificateDefault =
{
    id: 0,
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

