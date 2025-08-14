import React, { useContext } from 'react';
import {
  badgeClass,
  buttonClass,
  cardClass,
  classMap,
  colorMap,
  startupInfo,
  viewStartup,
} from '@/components/Tools/Misc';
import { OffCanvasContext } from '@/context/OffCanvasContext';
import {Guard, InlineGuard, navigateTo} from '../../Guard/Guard'
import { router } from '@inertiajs/react';
import { useAuth } from '@/context/AuthContext';
import { advisorUrl } from '@/app';
import { Link } from "@inertiajs/react";
import { FaStar } from 'react-icons/fa';
import { getRandomValues } from 'crypto';

type Props = {
  id: number;
  name: string;
  tagline: string;
  status: string;
  quality_status: string;
  stage: string;
  industry: string;
  rating: number;
  founder: string;
  description: string;
  image: string;
  founderId?: number;
  authUserId?: number;
  hideButtons?: boolean;
  showForm?: any;
  more?: any;
};

export default function StartupCard({
  id,
  name,
  tagline,
  status,
  quality_status,
  stage,
  industry,
  rating,
  founder,
  description,
  image,
  founderId,
  authUserId,
  hideButtons = false,
  more
}: Props) {


  const isOwner = founderId === authUserId;
  const {setShowOffCanvas, setOffData} = useContext(OffCanvasContext)

  const user = useAuth();

  const user_id = user?.user ? authUserId : Math.random().toString(36).substring(2,20);

  const guest = user?.user ? false : true

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
          <span className={badgeClass(quality_status === "VERIFIED" ? "success" : "danger")}>
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
          <p className={startupInfo()}><strong>Rating</strong><br /> {rating} <FaStar className={`inline ${colorMap.text_primary}`}/></p>
        </div>
        {!hideButtons && (
          <div className="flex justify-between gap-2 mt-4">
            <Link
            href={advisorUrl + `/startup/get/${id}`}
            className={classMap.button()}
            onClick={() => { viewStartup(id, user_id, guest) }}
            >
            View
            </Link>
            {!isOwner &&
            <button
            className={classMap.button()}
            onClick={() => {
              // <InlineGuard
              // action={() => setShowOffCanvas(true)}
              // requireAuth={true}
              // fallback={navigateTo(`${advisorUrl}/login`)}
              // />
              setShowOffCanvas(true),
              more ? setOffData(id) : ''
            }}
            >Rate Startup</button>}
          </div>
        )}
      </div>
    </div>
  );
}
