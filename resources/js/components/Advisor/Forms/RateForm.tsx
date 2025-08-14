import { classMap, colorMap, NotAuth } from "@/components/Tools/Misc";
import React, { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoStar, IoStarOutline } from "react-icons/io5";
import StarRating from "./StarRating";
import SendRequest from "@/components/Tools/SendRequest";
import { advisorUrl } from "@/app";
import { OffCanvasContext } from "@/context/OffCanvasContext";

const RateForm = ({showComment = true, startupID = null, auth = null, showBtn = false}) => {
    const {offData} = useContext(OffCanvasContext)
    const [data, setData] = useState({
        rate: "",
        comment: "",
        startup_id: startupID || offData
    })

    const formFields = [
        {
            id: 1,
            label: "Rate",
            field: "rate"
        },
        {
            id: 2,
            label: "Comment (Optional)",
            field: "text"
        }
    ]

    useEffect(() => {
        setData((prev) => ({
            ...prev,
            startup_id: startupID || offData
        }))

        console.log(data)
    },[startupID || offData])

    return(
        auth !== null ? (
            <div className="">
                {formFields.map(({id, label, field}) => {
                    return(
                        <>
                        <div key={id} className="flex flex-col">
                            {field == 'rate' ? (
                                <div className={`${classMap.pageSection()}`}>
                                    <label className={classMap.label()}>{label}</label>
                                    <div className="flex flex-row"
                                    >
                                    <div>
                                        <StarRating
                                        onRatingChange={(d) => 
                                        {
                                            setData((prev) => ({...prev, rate: d})),
                                            console.log(data)
                                        }
                                        }
                                        />
                                    </div>
                                    </div>
                                    {showBtn && (
                                        <SendRequest
                                        url={'/advisor/startup/rate'}
                                        method="post"
                                        data={data}
                                        className="w-full mt-2"
                                        onResponse={() => {}}
                                        text="Rate"
                                        />
                                    )}
                                </div>
                            ) : (
                                showComment ? (
                                    <textarea className={`${classMap.input()}`} name="comment"
                                    onChange={(e) => setData(prev => ({
                                        ...prev,
                                        comment: e.target.value
                                    }))}
                                placeholder="Drop a comment"></textarea>
                                ) : (
                                    <></>
                                )
                            )}
                        </div>
                        </>
                    )
                })}

                {!showBtn && (
                    <SendRequest
                    url={'/advisor/startup/rate'}
                    method="post"
                    data={data}
                    className="w-full"
                    onResponse={() => {}}
                    text="Rate"
                    />
                )}
            </div>
        ) : (
            <NotAuth
            action="Rate Startup"
            />
        )
    )
}

export default RateForm
