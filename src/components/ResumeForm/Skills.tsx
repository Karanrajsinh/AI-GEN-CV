import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { useResumeInfo } from '@/src/context/ResumeInfoContext';
// import GlobalApi from './../../../../../service/GlobalApi';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { FormSkills } from '@/src/Types/FormTypes';

// Define the type for each skill entry


function Skills() {
    const [skillsList, setSkillsList] = useState<FormSkills[]>([]);
    const { resumeId } = useParams<{ resumeId: string }>();

    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useResumeInfo();
    useEffect(() => {
        if (resumeInfo?.skills) {
            setSkillsList(resumeInfo?.skills || []); // Initialize with existing skills if available
        }
    }, []);

    const handleChange = (index: number, name: keyof FormSkills, value: string) => {
        const newEntries = [...skillsList];
        newEntries[index][name as keyof Omit<FormSkills, 'id'>] = value; // Cast to any to avoid type issues
        setSkillsList(newEntries);
    };

    const AddNewSkills = () => {
        setSkillsList([...skillsList, { name: '' }]);
    };

    const RemoveSkills = () => {
        setSkillsList((prevSkillsList) => prevSkillsList.slice(0, -1));
    };

    const onSave = async () => {
        setLoading(true);
        const data = {
            data: {
                skills: skillsList
            },
        };

        // try {
        //     const resp = await GlobalApi.UpdateResumeDetail(resumeId, data);
        //     console.log(resp);
        //     toast('Details updated!');
        // } catch (error) {
        //     toast('Server Error, Try again!');
        // } finally {
        //     setLoading(false);
        // }
    };

    useEffect(() => {

        if (!setResumeInfo) return;
        setResumeInfo((prevResumeInfo) => ({
            ...prevResumeInfo,
            skills: skillsList,
        }));
    }, [skillsList, setResumeInfo]);

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Skills</h2>
            <p>Add Your top professional key skills</p>

            <div>
                {skillsList.map((item, index) => (
                    <div className='flex justify-between my-4' key={index}>
                        <div>
                            <Input
                                className="w-full"
                                defaultValue={item.name}
                                onChange={(e) => handleChange(index, 'name', e.target.value)}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant="outline" onClick={AddNewSkills} className="text-primary">
                        + Add More Skill
                    </Button>
                    <Button variant="outline" onClick={RemoveSkills} className="text-primary">
                        - Remove
                    </Button>
                </div>
                <Button disabled={loading} onClick={onSave}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    );
}

export default Skills;
