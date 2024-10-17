import { Education, Experience, Skill } from "./ResumeTypes";

export type FormEducation = Omit<Education, 'id'>;


export type FormExperience = Experience;

export type FormSkills = Skill;