import React, { useState, useEffect, useRef, MutableRefObject } from "react";
import { TransformWrapper, TransformComponent, ReactZoomPanPinchContentRef } from "react-zoom-pan-pinch";
import ResumeDetails from "./ResumeDetails";
import { Button } from "@/components/ui/button";
import { TbZoomReset } from "react-icons/tb";
import { MdOutlineZoomIn, MdOutlineZoomOut } from "react-icons/md";
import { FaCircle, FaFileDownload } from "react-icons/fa";
import { handleGeneratePdf } from "@/services/generatePdf";
import { ImSpinner8 } from "react-icons/im";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { useResumeInfo } from "../context/ResumeInfoContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { editResume } from "@/services/supabase";


const THEMECOLORS = [
    { "name": " Dark Charcoal", value: "#4d4d4d" },
    { "name": "Slate Blue", "value": "#6A5ACD" },
    { "name": "Medium Sea Green", "value": "#3CB371" },
    { "name": "Dim Gray", "value": "#696969" },
    { "name": "Cadet Blue", "value": "#5F9EA0" },
    { "name": "Rosy Brown", "value": "#BC8F8F" },
    { "name": "Teal", "value": "#008080" },
    { "name": "Dark Khaki", "value": "#BDB76B" }
]





const Controls = ({ pageNumber, pinchRefs }: { pageNumber: number; pinchRefs: MutableRefObject<(ReactZoomPanPinchContentRef | null)[]> }) => {
    return (
        <div className="tools flex items-center">
            <Button onClick={() => pinchRefs.current[pageNumber]?.zoomIn()}><MdOutlineZoomIn className="text-cyan-200" /></Button>
            <Button onClick={() => pinchRefs.current[pageNumber]?.zoomOut()}><MdOutlineZoomOut className="text-cyan-200" /></Button>
            <Button onClick={() => pinchRefs.current[pageNumber]?.centerView(0.5, 400, "easeOutCubic")}><TbZoomReset className="text-cyan-200" /></Button>
        </div>
    );
};

function ResumePreview() {
    const [loading, setLoading] = useState(true);
    const [pdfDownlaod, setPdfDownload] = useState(false);
    const pinchRefs = useRef<(ReactZoomPanPinchContentRef | null)[]>([]);  // Array of refs
    const { resumeInfo, setResumeInfo } = useResumeInfo();

    const onThemeChange = (color: string) => {

        editResume(resumeInfo.resume_id, { themeColor: color })

        setResumeInfo((prev) =>
        ({
            ...prev,
            themeColor: color
        }))
    }

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 300);  // Simulate loading delay
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col gap-4 items-center w-[90%] mx-auto  xl:mx-0 xl:w-[50%] xl:my-8">
            {/* Control for the first TransformWrapper */}
            <div className="w-full xl:w-3/4 h-[75vh] xl:h-min overflow-hidden xl:border xl:border-cyan-600 xl:bg-slate-900 xl:bg-dot-cyan-900 flex justify-center items-center">
                <TransformWrapper
                    ref={(ref) => { pinchRefs.current[0] = ref; }}  // Store ref in pinchRefs array
                    onInit={() => setLoading(false)}
                    doubleClick={{ disabled: false }}
                    centerOnInit={true}
                    pinch={{ disabled: false }}
                    smooth={true}
                    zoomAnimation={{
                        animationTime: 10,
                        animationType: "linear",
                    }}
                    limitToBounds={false}
                    initialScale={0.5}
                    maxScale={5}
                    minScale={0.01}
                    wheel={{
                        step: 2,
                        wheelDisabled: false,
                        touchPadDisabled: false,
                    }}
                    velocityAnimation={{
                        disabled: false,
                        animationTime: 10,
                        animationType: 'easeOut',
                    }}
                    panning={{ disabled: false }}
                >
                    <div className={`transform transition-transform duration-500 ${loading ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}>
                        <TransformComponent contentClass="flex justify-center items-center">
                            <ResumeDetails />
                        </TransformComponent>
                    </div>
                </TransformWrapper>
            </div>
            <div className="flex items-center justify-center">

                <Controls pageNumber={0} pinchRefs={pinchRefs} />
                <Button className="w-min text-cyan-200" onClick={() => handleGeneratePdf(setPdfDownload)}>{pdfDownlaod ? <ImSpinner8 className="animate-spin" /> : <FaFileDownload />}</Button>
                <Select value={resumeInfo.themeColor} onValueChange={onThemeChange}>
                    <SelectTrigger className="bg-slate-900 text-sm text-white border-cyan-600">
                        <FaCircle style={{ color: `${resumeInfo.themeColor}` }} />
                    </SelectTrigger>
                    <SelectContent className='bg-slate-900   text-white text-xs  border-cyan-800'>
                        <p className="p-2 text-sm font-semibold text-cyan-300">Theme</p>
                        <hr className="border-cyan-600 mb-1" />
                        <ScrollArea className="min-h-auto overflow-y-scroll max-h-40 custom-scrollbar modal">
                            {THEMECOLORS.map((color) => (
                                <SelectItem key={color.value} value={color.value}>
                                    <div className="flex items-center gap-3">
                                        <FaCircle style={{ color: color.value }} />
                                        <span className="text-xs">{color.name}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </ScrollArea>
                    </SelectContent>
                </Select>

            </div>
        </div>
    );
}

export default ResumePreview;
