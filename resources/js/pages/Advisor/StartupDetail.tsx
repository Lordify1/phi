// StartupDetail.tsx

import RateForm from '@/components/Advisor/Forms/RateForm';
import { classMap, colorMap, getData, random } from '@/components/Tools/Misc';
import {StartupCommentDiv, StartupCommentForm} from '@/components/Ui/Advisor/StartupComment';
import StartupLike from '@/components/Ui/Advisor/StartupLike';
import { useAuth } from '@/context/AuthContext';
import LandingLayout from '@/layouts/Advisor/LandingLayout';
import { Head, Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { FaEye, FaHeart, FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const StartupDetail = ({startup, title}) => {
  const { id } = useParams();
  const [details, setDetails] = useState(startup);

  const user = useAuth();

  const user_id = user?.user ? user?.user?.id : random(20);
  const guest = user?.user ? false : true

  const fetchStartup = () => {
    const startup = getData('/startup/get',id, 'post');
    console.log(startup)
    setDetails(startup);
  }

  return (
    <LandingLayout>
      <Head title={title}/>
      <div className="w-full min-h-screen bg-[#0c0c0c] text-white px-4 py-6">
        {/* Back Button */}
        <div className="mb-6">
          <Link
          href=''
          >
          ← Back to Startups
          </Link>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 👉 Left Column (Comments & Engagement) */}
          <div className="lg:col-span-3 order-3 lg:order-1 space-y-4">
            <div className="bg-[#1a1a1a] p-4 rounded-md shadow">
              <div className="flex items-center justify-between text-sm text-gray-400">
                <StartupLike
                likes={startup?.likes_count}
                startup_id={startup?.id}
                user_id={user_id}
                guest={guest}
                auth={user.user}
                />
                <span><FaEye className={`inline ${colorMap.text_primary}`}/> {startup.views_count} Views</span>
              </div>
            </div>

            {/* Rate Form  */}
              <RateForm 
              showComment={false}
              startupID={startup.id}
              showBtn={true}
              auth={user.user}
              />

            {/* Comment Form  */}
            <StartupCommentForm
            auth={user.user}
            startup_id={startup?.id}
            />
          </div>

          {/* 🎯 Center Column (Startup Details) */}
          <div className="lg:col-span-6 order-1 space-y-6">
            {/* Header */}
            <div className="bg-[#1a1a1a] p-4 rounded-md shadow">
              <div className="flex items-between space-x-4">
                <img
                  src="https://placehold.co/60x60"
                  alt="Startup Logo"
                  className="rounded-full w-16 h-16 object-cover"
                />
                <div>
                  <h2 className="text-2xl font-bold">{startup.name}</h2>
                  <p className="text-sm text-gray-400">{startup.industry} · {startup.stage} · {startup.rating} <FaStar className={`inline mb-1 ${colorMap.text_primary}`}/></p>
                </div>
              </div>
            </div>

            {/* Elevator Pitch */}
            <div className="bg-[#1a1a1a] p-4 rounded-md shadow">
              <h3 className={`${classMap.pageHeader()}`}>Elevator Pitch</h3>
              <p className="text-sm text-gray-300">
                This startup is disrupting the payments industry with a lightning-fast cross-border solution tailored for Africa and beyond.
              </p>
            </div>

            {/* Pitch Deck Download */}
            <div className="bg-[#1a1a1a] p-4 rounded-md shadow">
              <h3 className={`${classMap.pageHeader()}`}>Pitch Deck</h3>
              <a
                href="#"
                className="text-blue-400 hover:underline text-sm"
                download
              >
                📥 Download pitch_deck.pdf
              </a>
            </div>

            {/* AI Sections */}
            <div className="bg-[#1a1a1a] p-4 rounded-md shadow space-y-4">
              <h3 className="text-lg font-semibold">AI Summary</h3>
              <div>
                <h4 className="text-sm font-semibold text-purple-400">Problem</h4>
                <p className="text-sm text-gray-300">Small businesses struggle with high cross-border fees and delayed transactions.</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-purple-400">Solution</h4>
                <p className="text-sm text-gray-300">An end-to-end fintech platform leveraging blockchain to lower fees and increase speed.</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-purple-400">Market Strategy</h4>
                <p className="text-sm text-gray-300">Targeting African SMEs via direct partnerships and influencer campaigns.</p>
              </div>
            </div>

            {/* Comment Section  */}
            <StartupCommentDiv 
            startup_id={startup?.id}
            />
          </div>

          {/* 🤝 Right Column (Similar Startups) */}
          <div className="lg:col-span-3 order-2 lg:order-3 space-y-4">
            <div className="bg-[#1a1a1a] p-4 rounded-md shadow">
              <h3 className={`${classMap.pageHeader()}`}>Similar Startups</h3>
              {/* You’ll loop through keyword-matched results */}
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="hover:text-white cursor-pointer">PayLink</li>
                <li className="hover:text-white cursor-pointer">AfroPay</li>
                <li className="hover:text-white cursor-pointer">TradeSwift</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default StartupDetail;
