import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import {
  cardClass,
  headingClass,
  sectionClass,
  linkClass,
  buttonClass,
  classMap
} from "@/components/Tools/Misc"
import DashboardLayout from "@/layouts/Advisor/DashboardLayout";
import { founderSidebar } from "@/data/founderSidebarData";
import Offcanvas from "@/components/Ui/Offcanvas";
import StartupForm from "@/components/Advisor/Founder/StartupForm";

const FounderDashboard = ({user}) => {
  const [showForm, setShowForm] = useState(false);
  
  const founderData = {
    name: "Lordify",
    pitchDeckStatus: "Uploaded",
    feedbackCount: 4,
    suggestions: [
      "Clarify your monetization strategy",
      "Add Go-To-Market slide",
      "Include growth KPIs",
    ],
    deckLink: "/storage/pitch-decks/lordify-deck.pdf"
  };

  return (
    <>
      <Head title="Founder Dashboard" />

      <DashboardLayout sidebarDataType="founder" sidebarData={founderSidebar}>
        <h1 className="text-3xl font-bold mb-6">Welcome back, {user.name} 👋</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`${cardClass()} flex-row items-center justify-between`}>
            <div className="text-left">
              <h2 className={classMap.heading}>Pitch Deck</h2>
              <p className="text-[#00FFD1] font-medium">{founderData.pitchDeckStatus}</p>
              <a href={founderData.deckLink} className={classMap.link + " text-sm mt-2 inline-block"}>
                View Deck
              </a>
            </div>
            <div>
              <button className={buttonClass}
              onClick={() => {
                // setSelectedData(null);
                setShowForm(true);
              }}
              >
                +
              </button>
            </div>
          </div>

          <div className={cardClass()}>
            <div className="text-left">
              <h2 className={headingClass}>AI Suggestions</h2>
              <ul className="list-disc pl-5 text-sm text-gray-300">
                {founderData.suggestions.map((sug, idx) => (
                  <li key={idx}>{sug}</li>
                ))}
              </ul>
              <p className="text-xs text-gray-500 mt-2">
                {founderData.feedbackCount} suggestions generated
              </p>
            </div>
          </div>

          <div className={`${cardClass()} md:col-span-2`}>
            <div className="text-left">
              <h2 className={headingClass}>Coming Soon</h2>
              <p className="text-gray-400">🔥 Connect with investors, track activity, and access more AI features!</p>
            </div>
          </div>
        </div>
      </DashboardLayout>

      <Offcanvas
      isOpen={showForm}
      onClose={() => setShowForm(false)}
      title={`My Startup Info`}
      >
        <StartupForm
        onClose={() => setShowForm(false)}
        onResponse={() => {}}
        EditData={() => {}}
        />
      </Offcanvas>
    </>
  );
};

export default FounderDashboard;