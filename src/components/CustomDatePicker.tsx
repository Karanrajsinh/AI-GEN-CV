"use client";

import * as React from "react";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";



type DatePickerProps = {
    setFieldValue: React.Dispatch<React.SetStateAction<Date | string>>;
    fieldName: string;
    fieldValue: Date | string;
    currentlyWorking?: boolean;
};

export function SampleDatePicker({ fieldName, fieldValue, setFieldValue, currentlyWorking }: DatePickerProps) {
    const defaultDate = fieldValue !== "" ? new Date(fieldValue) : new Date();
    const currentDate = new Date().getFullYear()
    const presentEndDate = fieldName === "endDate" && currentlyWorking;
    const [date, setDate] = React.useState<Date | undefined>(defaultDate);





    const handleDateChange = (newDate: Date) => {

        setDate(newDate);
        setFieldValue(newDate || "");
    };
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    disabled={presentEndDate}
                    className={cn("w-full justify-start modal text-xs active:scale-100 duration-0 sm:text-sm text-left mt-1 font-normal border-cyan-800 bg-slate-900", !date && "text-muted-foreground")}
                >
                    <CalendarIcon className="mr-2 h-2 w-2 modal" />
                    {date ? format(date, "MMM yyyy") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto modal border text-white border-cyan-800 bg-slate-900 max-h-max p-0">
                <Calendar
                    defaultMonth={date}
                    className="outline-none focus:ring-0 modal "
                    mode="single"
                    captionLayout="dropdown-buttons"
                    selected={date}
                    onMonthChange={handleDateChange}
                    fromYear={1960}
                    toYear={fieldName === "endDate" ? currentDate + 6 : currentDate + 1}
                />
            </PopoverContent>
        </Popover>
    );
}
