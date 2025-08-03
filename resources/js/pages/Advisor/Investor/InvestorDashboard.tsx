import React from "react";
import { Head } from "@inertiajs/react";
import {
  cardClass,
  headingClass,
  linkClass,
} from "@/components/Tools/Misc";
import DashboardLayout from "@/layouts/Advisor/DashboardLayout";
import { investorSidebar } from "@/data/investorSidebarData";


const InvestorDashboard = ({user}) => {
  const investor = {
    name: "InvestorQueen",
    starsGiven: 12,
    startupsReviewed: 6,
    upcomingMeetings: [
      { name: "ZestPay", time: "Wed 2PM" },
      { name: "NovaAI", time: "Thu 11AM" }
    ]
  };

  console.log(user)


  return (
    <>
      <Head title="Investor Dashboard" />

      <DashboardLayout sidebarDataType="investor" sidebarData={investorSidebar}>
        <h1 className="text-3xl font-bold mb-6">Welcome back, {user?.name} 💸</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={cardClass(1)}>
            <div className="text-left">
              <h2 className={headingClass}>Stars Given</h2>
              <p className="text-[#00FFD1] font-medium text-lg">{investor.starsGiven}</p>
              <p className="text-sm text-gray-400">Keep rewarding the promising ones!</p>
            </div>
          </div>

          <div className={cardClass(1)}>
            <div className="text-left">
              <h2 className={headingClass}>Startups Reviewed</h2>
              <p className="text-white text-lg">{investor.startupsReviewed}</p>
              <a href="/startups" className={linkClass + " text-sm mt-2 inline-block"}>
                Browse More Startups
              </a>
            </div>
          </div>

          <div className={cardClass(2)}>
            <div className="text-left">
              <h2 className={headingClass}>Upcoming Meetings</h2>
              <ul className="text-sm text-gray-300 space-y-1">
                {investor.upcomingMeetings.map((m, idx) => (
                  <li key={idx}>🗓️ {m.name} – <span className="text-blue-400">{m.time}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default InvestorDashboard;
