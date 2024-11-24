import supabase from "@/utils/supabase/client";


export const logout = async () => {
    await fetch("/logout"); // Server-side logout request
    window.location.reload(true); // Forces a full page reload, bypassing cache
};

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
        throw Error("Unable To Create Resume Try Again !")
    }

    return data;
}



export const addResumeWithData = async (resumeData) => {

    // Insert the resume and retrieve the resume_id
    const { data: resumeResult, error: resumeError } = await supabase
        .from('resumes')
        .insert({
            resume_name: resumeData.resume_name,
            fullName: resumeData.fullName,
            jobTitle: resumeData.jobTitle,
            address: resumeData.address,
            phone: resumeData.phone,
            email: resumeData.email,
            themeColor: resumeData.themeColor,
            summary: resumeData.summary,
        })
        .select('*')
        .single();

    if (resumeError) {
        console.error("Error adding resume:", resumeError);
        return { error: ` error occured ${resumeError.message}` };
    }

    // Helper function to insert multiple entries into a section
    const addEntries = async (section, entries) => {
        for (const entry of entries) {
            const dataWithResumeId = { ...entry, resume_id: resumeResult.resume_id };
            await addSectionEntry(section, dataWithResumeId);
        }
    };

    // Insert associated sections
    await addEntries("projects", resumeData.projects);
    await addEntries("experiences", resumeData.experience);
    await addEntries("educations", resumeData.education);
    await addEntries("skills", resumeData.skills);
    await addEntries("certificates", resumeData.certificates);
    await addEntries("languages", resumeData.languages);

    // Return the created resume
    return resumeResult;
};

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



export const duplicateResume = async (resumeId, userId, resumeName) => {
    // Step 1: Fetch the original resume data
    const originalResumeData = await getResumeData(resumeId, userId);
    /* eslint-disable */
    const sanitizedResumeData = {
        ...originalResumeData,
        resume_name: resumeName,
        projects: originalResumeData.projects.map(({ id, ...rest }) => rest),
        experience: originalResumeData.experience.map(({ id, ...rest }) => rest),
        education: originalResumeData.education.map(({ id, ...rest }) => rest),
        skills: originalResumeData.skills.map(({ id, ...rest }) => rest),
        certificates: originalResumeData.certificates.map(({ id, ...rest }) => rest),
        languages: originalResumeData.languages.map(({ id, ...rest }) => rest),
    };
    /* eslint-enable */
    if (!originalResumeData) {
        throw new Error('Original resume data not found');
    }

    // Step 2: Create a new resume with the same data
    const newResume = await addResumeWithData(sanitizedResumeData);

    // Return the newly created resume instance
    return newResume;

};

export async function getResumeName(resumeId) {
    const { data } = await supabase
        .from('resumes')
        .select('resume_name')
        .eq('resume_id', resumeId)
        .order('created_at', { ascending: true })



    return data
}


export async function getResumeData(resumeId, userId) {
    const { data: resume, error: resumeError } = await supabase
        .from('resumes')
        .select(
            `
            resume_name,
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
        .eq('user_id', userId)
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
        .eq('resume_id', resumeId)
        .order('created_at', { ascending: true });

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
        .eq('resume_id', resumeId)
        .order('created_at', { ascending: true });

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
        .eq('resume_id', resumeId)
        .order('created_at', { ascending: true });

    const { data: languages, error: languagesError } = await supabase
        .from('languages')
        .select(

            `  id,
            isVisible,
            name,
            proficientLevel
`
        )
        .eq('resume_id', resumeId)
        .order('created_at', { ascending: true })

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

export async function deleteResume(resume_id) {
    const { error } = await supabase.from('resumes').delete().eq("resume_id", resume_id);
    handleSupabaseError(error)

    return true;
}