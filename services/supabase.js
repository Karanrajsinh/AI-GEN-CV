import supabase from "@/utils/supabase/client";




export async function addResume(resumeName, userName, email) {
    const { data, error } = await supabase
        .from('resumes')
        .insert([
            {
                resume_name: resumeName,
                fullName: userName,
                email: email
            }
        ])
        .select('*')
        .single();

    if (error) {
        console.error("Error creating resume:", error.message);
        return null;
    }

    return data;
}


export async function getUserResumes(userId) {


    const { data, error } = await supabase
        .from('resumes')
        .select('resume_id, resume_name')
        .eq('user_id', userId);

    if (error) {
        console.error('Error fetching resumes:', error.message);

    }

    return data || [];
}




export async function getResumeData(resumeId) {
    const { data: resume, error: resumeError } = await supabase
        .from('resumes')
        .select(
            `
            resume_id,  
            themeColor,
            fullName,
            jobTitle,
            address,
            phone,
            email,
            summary,
            summaryVisible,
            isExperienceVisible,
            isProjectVisible,
            isEducationVisible,
            isSkillVisible,
            isCertificateVisible,
            isLanguageVisible
`
        )
        .eq('resume_id', resumeId)
        .single();

    if (resumeError || !resume) {
        console.error("Error fetching resume:", resumeError?.message);
        return null;
    }
    const { data: experience, error: experienceError } = await supabase
        .from('experiences')
        .select('*')
        .eq('resume_id', resumeId)
        .order('created_at', { ascending: true });

    const { data: education, error: educationError } = await supabase
        .from('educations')
        .select(
            `
            id,
            isVisible,
            universityName,
            degree,
            major,
            startDate,
            endDate`

        )
        .eq('resume_id', resumeId);

    const { data: skills, error: skillsError } = await supabase
        .from('skills')
        .select(

            ` id,
            isVisible,
            name`

        )
        .eq('resume_id', resumeId);

    const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select(

            ` id,
            isVisible,
            name,
            skillPrompt,
            rolePrompt,
            description,
            startDate,
            endDate,
            currentlyWorking`

        )
        .eq('resume_id', resumeId);

    const { data: certificates, error: certificatesError } = await supabase
        .from('certificates')
        .select(

            `  id,
            isVisible,
            name,
            issuer,
            issueDate,
            website`

        )
        .eq('resume_id', resumeId);

    const { data: languages, error: languagesError } = await supabase
        .from('languages')
        .select(

            `  id,
            isVisible,
            name,
            proficientLevel
`
        )
        .eq('resume_id', resumeId);

    const errors = [experienceError, educationError, skillsError, projectsError, certificatesError, languagesError];
    if (errors.some(err => err)) {
        console.error("Error fetching one or more resume sections:", errors);
        return null;
    }

    return {
        ...resume,
        /* eslint-disable */
        experience: experience?.map(({ resume_id, ...rest }) => rest),
        projects: projects?.map(({ resume_id, ...rest }) => rest),
        education: education?.map(({ resume_id, ...rest }) => rest),
        skills: skills?.map(({ resume_id, ...rest }) => rest),
        certificates: certificates?.map(({ resume_id, ...rest }) => rest),
        languages: languages?.map(({ resume_id, ...rest }) => rest)
    };
}

/* eslint-enable */
const handleSupabaseError = (error) => {
    if (error) {
        console.error("Supabase Error:", error.message);
        throw new Error('Unable To Save Changes')
    }
};

export const addSectionEntry = async (section, data) => {
    const { data: result, error } = await supabase
        .from(section)
        .insert(data)
        .select()
        .single();
    handleSupabaseError(error);
    return result;
};

export const editSectionEntry = async (section, id, data) => {
    const { data: result, error } = await supabase
        .from(section)
        .update(data)
        .eq("id", id)
        .select()
        .single();
    handleSupabaseError(error);
    return result;
};


export const deleteSection = async (section, resumeId) => {
    const { data: result, error } = await supabase
        .from(section)
        .delete()
        .eq("resume_id", resumeId);

    handleSupabaseError(error)

    return result;
};

export const deleteSectionEntry = async (section, id) => {
    const { error } = await supabase.from(section).delete().eq("id", id);
    handleSupabaseError(error)

    return true;
};


export async function editResume(resumeId, updatedData) {
    const { data, error } = await supabase
        .from('resumes')
        .update(updatedData)
        .eq('resume_id', resumeId)
        .select()
        .single();

    handleSupabaseError(error)

    return data;
}
