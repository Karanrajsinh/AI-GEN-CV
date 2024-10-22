// "use client"

// import * as React from "react"
// import { buttonVariants } from "../ui/button"
// import { cn } from "@/lib/utils"
// import { ChevronLeft, ChevronRight } from "lucide-react"
// import { DayPicker } from "react-day-picker"

// export type CalendarProps = React.ComponentProps<typeof DayPicker>

// function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
//   return (
//     <DayPicker
//       showOutsideDays={showOutsideDays}
//       className={cn("p-3 w-[300px]", className)}
//       classNames={{
//         tbody: "hidden",
//         vhidden: "vhidden hidden", // Add this line
//         months: "flex flex-col ",
//         month: "",
//         caption: "flex justify-center pt-1  relative items-center",
//         caption_label: "text-sm hidden font-medium",
//         caption_dropdowns: "flex justify-center gap-3 custom-scrollbar",
//         nav: " flex items-center",
//         nav_button: cn(
//           buttonVariants({ variant: "default" }),
//           "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
//         ),
//         nav_button_previous: "absolute left-1",
//         nav_button_next: "absolute right-1",
//         table: "w-full border-collapse space-y-1",
//         head_row: " hidden flex",
//         head_cell: " text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
//         row: "flex w-full mt-2",
//         cell: "  text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
//         day: cn(buttonVariants({ variant: "ghost" }), "  h-9 w-9 p-0 font-normal aria-selected:opacity-100"),
//         day_selected:
//           " hidden bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
//         day_today: "bg-accent text-accent-foreground",
//         day_outside: "text-muted-foreground opacity-50",
//         day_disabled: "text-muted-foreground opacity-50",
//         day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
//         day_hidden: "invisible",
//         ...classNames,
//       }}
//       components={{
//         IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
//         IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
//       }}
//       {...props}
//     />
//   )
// }
// Calendar.displayName = "Calendar"

// export { Calendar }

"use client"

import * as React from "react"
import { buttonVariants } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, DropdownProps } from "react-day-picker"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 w-[300px]", className)}
      classNames={{
        tbody: "hidden",
        vhidden: "vhidden hidden", // Add this line
        months: "flex flex-col ",
        month: "",
        caption: "flex justify-center pt-1  relative items-center",
        caption_label: "text-sm hidden font-medium",
        caption_dropdowns: "flex justify-center gap-3 custom-scrollbar",
        nav: " flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "default" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: " hidden flex",
        head_cell: " text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "  text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(buttonVariants({ variant: "ghost" }), "  h-9 w-9 p-0 font-normal aria-selected:opacity-100"),
        day_selected:
          " hidden bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Dropdown: ({ value, onChange, children }: DropdownProps) => {
          const options = React.Children.toArray(children) as React.ReactElement<React.HTMLProps<HTMLOptionElement>>[]
          const selected = options.find((child) => child.props.value === value)
          const handleChange = (value: string) => {
            const changeEvent = {
              target: { value },
            } as React.ChangeEvent<HTMLSelectElement>
            onChange?.(changeEvent)
          }
          return (
            <Select
              value={value?.toString()}
              onValueChange={(value) => {
                handleChange(value)
              }}
            >
              <SelectTrigger className="pr-1.5 focus:ring-0 border border-cyan-800">
                <SelectValue>{selected?.props?.children}</SelectValue>
              </SelectTrigger>
              <SelectContent position="popper" className="bg-slate-900 border-cyan-800 text-white">
                <ScrollArea className="h-80 custom-scrollbar">
                  {options.map((option, id: number) => (
                    <SelectItem className="focus:bg-cyan-600 focus:text-white focus:bg-opacity-30" key={`${option.props.value}- ${id}`} value={option.props.value?.toString() ?? ""}>
                      {option.props.children}
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select >
          )
        },
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }