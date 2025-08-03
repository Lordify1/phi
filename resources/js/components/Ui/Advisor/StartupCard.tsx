import React, { useContext } from 'react';
import {
  badgeClass,
  buttonClass,
  cardClass,
  classMap,
  colorMap,
  startupInfo,
} from '@/components/Tools/Misc';
import { OffCanvasContext } from '@/context/OffCanvasContext';

type Props = {
  id: number;
  name: string;
  tagline: string;
  status: string;
  stage: string;
  industry: string;
  rating: number;
  founder: string;
  description: string;
  image: string;
  founderId?: number;
  authUserId?: number;
  hideButtons?: boolean;
  showForm?: any
};

export default function StartupCard({
  id,
  name,
  tagline,
  status,
  stage,
  industry,
  rating,
  founder,
  description,
  image,
  founderId,
  authUserId,
  hideButtons = false,
  showForm
}: Props) {
  const isOwner = founderId === authUserId;
  const {setShowOffCanvas} = useContext(OffCanvasContext)
  return (
    <div
      key={id}
      className={`
        ${cardClass(1)}
        hover:${colorMap.border_primary} hover:shadow-md transition-all duration-300
        translate-y-4
        animate-fade-in
      `}
    >
      <div className="w-full">
        <div className="flex justify-between items-center mb-2 ">
          <h3 className="text-white font-bold text-lg">{name}</h3>
          <span className={badgeClass(status === "Approved" ? "success" : "danger")}>
            {status}
          </span>
        </div>
        <img
          src={image}
          alt={`Startup ${name}`}
          className="w-full h-48 object-cover rounded-md mb-3 transition-all duration-300 hover:rounded-xl"
        />
        <p className="text-gray-300 text-sm mb-1">{tagline}</p>
        <p className="text-gray-400 text-sm">{description}</p>
        <div className="grid grid-cols-2 text-sm text-gray-500 mt-3">
          <p className={startupInfo()}><strong>Founder</strong><br /> {founder}</p>
          <p className={startupInfo()}><strong>Stage</strong><br /> {stage}</p>
          <p className={startupInfo()}><strong>Industry</strong><br /> {industry}</p>
          <p className={startupInfo()}><strong>Rating</strong><br /> {rating} ⭐</p>
        </div>
        {!hideButtons && (
          <div className="flex justify-between gap-2 mt-4">
            <button className={classMap.button()}>View Details</button>
            {!isOwner && 
            <button 
            className={classMap.button()}
            onClick={() => setShowOffCanvas(true)}
            >Rate Startup</button>}
          </div>
        )}
      </div>
    </div>
  );
}
