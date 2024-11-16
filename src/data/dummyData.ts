
export const resumeData = {
    resume_id: '',
    fullName: 'James Carter',
    jobTitle: 'Front-End Developer',
    address: '525 N tryon Street, NC 28117',
    phone: '(123)-456-7890',
    email: 'exmaple@gmail.com',
    themeColor: "#4d4d4d",
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    summaryVisible: true,
    isExperienceVisible: true,
    isProjectVisible: true,
    isEducationVisible: true,
    isSkillVisible: true,
    isCertificateVisible: true,
    isLanguageVisible: true,
    projects: [
        {
            id: '1',
            isVisible: true,
            name: "E-commerce Platform",
            description: "I built a responsive e-commerce platform...",
            startDate: "2022-05-01",
            endDate: "2023-02-15",
            currentlyWorking: false,
            skillPrompt: "React, Node.js, MySQL, and Stripe API integration for secure payments",
            rolePrompt: "Developed product browsing, cart functionality, and payment processes. Ensured fast load times and responsive design, improving user retention by 20%."
        },
        {
            id: '2',
            isVisible: true,
            name: "Social Media Mobile App",
            description: "I developed a social media app...",
            startDate: "2021-11-10",
            endDate: "2022-08-01",
            currentlyWorking: false,
            skillPrompt: "React Native, Firebase for authentication, Amazon S3 for media storage",
            rolePrompt: "Led the implementation of real-time messaging and media sharing features, achieving a 99% uptime and seamless cross-platform performance."
        },
        {
            id: '3',
            isVisible: true,
            name: "Task Management System",
            description: "This project was a task management system...",
            startDate: "2023-03-01",
            endDate: "2023-09-15",
            currentlyWorking: false,
            skillPrompt: "Angular, Node.js, WebSocket for real-time updates, OAuth for secure access",
            rolePrompt: "Created an interactive dashboard for task tracking and organized secure user authentication, reducing login-related support requests by 35%."
        }
    ],

    experience: [
        {
            id: '4',
            isVisible: true,
            title: 'Full Stack Developer Intern',
            companyName: 'Amazon',
            location: "USA",
            startDate: 'Jan 2021',
            endDate: 'March 2023',
            currentlyWorking: true,
            description: 'During my time at Amazon...',
            skillPrompt: "React, Node.js, API development, problem-solving in large-scale systems",
            rolePrompt: "Built RESTful APIs and optimized frontend performance, reducing page load times by 30% and increasing customer satisfaction scores by 15%."
        },
        {
            id: '5',
            isVisible: true,
            title: 'Frontend Developer Intern',
            companyName: 'Google',
            location: "USA",
            startDate: 'Jan 2018',
            endDate: 'March 2020',
            currentlyWorking: false,
            description: 'At Google, I had the chance...',
            skillPrompt: "JavaScript, React, CSS for responsive design, API integration",
            rolePrompt: "Enhanced in-house applications, implemented designs to improve UX, and reduced reported frontend bugs by 40%."
        }
    ],
    education: [
        {
            id: '6',
            isVisible: true,
            universityName: 'Western Illinois University',
            startDate: 'Aug 2018',
            endDate: 'Dec 2019',
            degree: 'Master',
            major: 'Computer Science',
        },
        {
            id: '7',
            isVisible: true,
            universityName: 'Western Illinois University',
            startDate: 'Aug 2018',
            endDate: 'Dec 2019',
            degree: 'Master',
            major: 'Computer Science',
        }
    ],
    skills: [
        {
            id: '1',
            isVisible: true,
            name: 'Angular',
        },
        {
            id: '2',
            isVisible: true,
            name: 'React',
        },
        {
            id: '3',
            isVisible: true,
            name: 'MySql',
        },
        {
            id: '4',
            isVisible: true,
            name: 'React Native',
        },

    ],
    certificates:
        [

        ],
    languages: []
}

