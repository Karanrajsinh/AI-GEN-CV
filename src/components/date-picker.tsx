"use client";

import * as React from "react";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { cn } from "@/lib/utils";
import { formatDate } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useResumeInfo } from "../context/ResumeInfoContext";
import { ResumeInfo } from "../Types/ResumeTypes";


type ResumeInfoKeys = keyof ResumeInfo;

type DatePickerProps = {
    sectionType: string; // e.g., 'experience', 'education', etc.
    index: number; // Index of the item in the section
    fieldName: string; // Field name to update (e.g., 'startDate', 'endDate')
    defaultValue: Date | string;
};

export function SampleDatePicker({ sectionType, index, fieldName, defaultValue }: DatePickerProps) {
    const defaultDate = new Date(defaultValue);
    const currentDate = new Date().getFullYear() + 6;
    const { resumeInfo, setResumeInfo } = useResumeInfo();
    const currentlyWorking = fieldName === "endDate" && resumeInfo[sectionType][index]?.currentlyWorking;




    const startDate = resumeInfo[sectionType][index]?.startDate ? new Date(resumeInfo[sectionType][index]?.startDate) : null;

    const [date, setDate] = React.useState<Date | undefined>(() => {
        // Pre-select the date if available in the resumeInfo
        const selectedSection = resumeInfo[sectionType as ResumeInfoKeys] && resumeInfo[sectionType as ResumeInfoKeys][index];
        if (selectedSection && typeof selectedSection === 'object' && fieldName in selectedSection) {
            const fieldValue = selectedSection[fieldName as keyof typeof selectedSection];

            if (typeof fieldValue === 'string' || typeof fieldValue === 'number') {
                return new Date(fieldValue);
            }
        }
        return undefined;
    });
    React.useEffect(() => {
        setDate(defaultDate);
        /*eslint-disable-next-line*/
    }, [currentlyWorking, setDate])

    const handleDateChange = (newDate: Date | undefined) => {
        setDate(newDate);

        // Update the resumeInfo dynamically based on the section type and field name
        setResumeInfo((prev) => {
            const updatedSection = [...prev[sectionType]]; // Copy the section
            updatedSection[index] = {
                ...updatedSection[index],
                [fieldName]: newDate?.toISOString() || "", // Convert date to ISO string or empty string if no date
            };

            return {
                ...prev,
                [sectionType]: updatedSection, // Update the specific section
            };
        });
    };
    console.log(date);
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    disabled={currentlyWorking}
                    className={cn("w-full justify-start text-left font-normal border-cyan-800 bg-slate-900", !date && "text-muted-foreground")}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? formatDate(date, "MMM yyyy") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto border text-white border-cyan-800 bg-slate-900 max-h-max p-0 date-picker">
                <Calendar
                    className="outline-none focus:ring-0 date-picker"
                    mode="single"
                    captionLayout="dropdown-buttons"
                    selected={date}
                    defaultMonth={defaultDate}
                    onMonthChange={handleDateChange}
                    fromYear={fieldName === "endDate" && startDate ? startDate.getFullYear() : 1960}
                    toYear={currentDate}
                />
            </PopoverContent>
        </Popover>
    );
}
