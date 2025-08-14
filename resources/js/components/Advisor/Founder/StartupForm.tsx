import { classMap, colorMap, inputClass } from "@/components/Tools/Misc";
import React, { useCallback, useState } from "react";
import { FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useDropzone } from 'react-dropzone';


export default function StartupForm({onClose, onResponse, EditData}){
    const [formData, setFormData] = useState({
        story: "",
        pitch_deck: [],

    })

    const formFields = [
        {
            label: "Name",
            field: "name"
        }
    ]

  const onDrop = useCallback((acceptedFiles) => {
    console.log('Files dropped:', acceptedFiles);
    setFormData((prev) => ({
        ...prev,
        pitch_deck: acceptedFiles
    }))
    console.log(formData)
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


    return (
        formData.pitch_deck.length > 0 ? (
            <div 
            className={`text-white border-2 border-dashed ${isDragActive ? colorMap.border_primary : 'border-gray-400'} p-8 rounded-md text-center cursor-pointer h-[90vh]`}>
            <div className={`flex flex-col items-center justify-center w-full h-full pitch-dech-div`}>
                <FaCheckCircle className={`${colorMap.text_primary} text-5xl`}/>
                <p className="mt-4 text-bold">File Uploaded. Ready to Process</p>
                <div className="flex flex-row">
                    <button className={`${classMap.button()}`}>Process</button>
                    <button 
                    onClick={() => setFormData((prev) => ({
                        ...prev,
                        pitch_deck: []
                    }))}
                    className={`${classMap.button(colorMap.bg_secondary, colorMap.bg_primary)}`}>Cancel</button>
                </div>
            </div>
            </div>
        ) : (
            <div 
            {...getRootProps()}
            className={`text-white border-2 border-dashed ${isDragActive ? colorMap.border_primary : 'border-gray-400'} p-8 rounded-md text-center cursor-pointer h-[90vh]`}>
            <input {...getInputProps()} />
            <div className={`flex flex-col items-center justify-center w-full h-full pitch-dech-div`}>
                <FaPlusCircle className="text-5xl"/>
                {
                isDragActive
                ? <p className={`${isDragActive ? colorMap.text_primary : 'text-white'} font-bold`}>Let's Go</p>
                : <p className="mt-2 ">Drag 'n' drop a your pitch deck here, or click to upload</p>
                }
            </div>
            </div>
        )
    );

}