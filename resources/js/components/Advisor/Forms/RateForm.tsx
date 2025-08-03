import { classMap, colorMap } from "@/components/Tools/Misc";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoStar, IoStarOutline } from "react-icons/io5";
import StarRating from "./StarRating";
import SendRequest from "@/components/Tools/SendRequest";
import { advisorUrl } from "@/app";

const RateForm = ({}) => {
    const [data, setData] = useState({
        rate: 0,
        comment: ""
    })

    const [starType, setStarType] = useState(false)

    const formFields = [
        {
            label: "Rate",
            field: "rate"
        },
        {
            label: "Comment (Optional)",
            field: "text"
        }
    ]

    useEffect(() => {
        console.log(data)
    }, [data])

    return(
        <div className="space-y-4">
            {formFields.map(({label, field}) => {
                return(
                    <>
                    <div className="flex flex-col">
                        <label className={classMap.label()}>{label}</label>
                        {field == 'rate' ? (
                            <div className="flex flex-row"
                            >
                            <div>
                                <StarRating/>
                            </div>
                            </div>
                        ) : (
                            <textarea className={`${classMap.input()}`} name="comment"
                            onChange={(e) => setData(prev => ({
                                ...prev,
                                comment: e.target.value
                            }))}
                            placeholder="Drop a comment"></textarea>
                        )}
                    </div>
                    </>
                )
            })}
            <SendRequest
            url={'/advisor/startup/rate'}
            method="post"
            data={data}
            className="w-full"
            onResponse={() => {}}
            text="Rate"
            />
        </div>
    )
}

export default RateForm
