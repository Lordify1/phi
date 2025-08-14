import { colorMap } from "@/components/Tools/Misc";
import React, { useEffect, useState } from "react";
import { IoStar, IoStarOutline } from "react-icons/io5";
import { start } from "repl";


const StarRating = ({ totalStars = 5, selected = 0, onRatingChange }) => {
    const [hover, setHover] = useState(0)

    return (
        <div className="flex flex-row">
            {[...Array(totalStars)].map((_, index) => {
                const starValue = index + 1
                return (
                    <span
                        key={index}
                        onClick={() => onRatingChange && onRatingChange(starValue)}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(0)}
                    >
                        {starValue <= (hover || selected) ? (
                            <IoStar className={`${colorMap.text_primary} text-lg m-1`} />
                        ) : (
                            <IoStarOutline className="text-lg text-gray-400 m-1" />
                        )}
                    </span>
                )
            })}
        </div>
    )
}

export default StarRating