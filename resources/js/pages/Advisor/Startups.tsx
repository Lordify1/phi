import React, { useContext, useEffect, useState } from 'react';
import StartupCard from '@/components/Ui/Advisor/StartupCard';
import {
  headingClass,
  emptyResult,
} from '@/components/Tools/Misc';
import { FaFilter, FaTimes } from 'react-icons/fa';
import { Head } from '@inertiajs/react';
import { Header } from '@/components/Main/Header';
import Filters from '@/components/Tools/StartUpsFilter';
import LandingLayout from '@/layouts/Advisor/LandingLayout';
import { Empty } from 'antd';
import Offcanvas from '@/components/Ui/Offcanvas';
import RateForm from '@/components/Advisor/Forms/RateForm';
import { OffCanvasContext, OffCanvasProvider } from '@/context/OffCanvasContext';
import { useAuth } from '@/context/AuthContext';


const dummyStartups = [
  {
    id: 1,
    name: "SparkTech AI",
    tagline: "AI for smarter logistics",
    status: "Approved",
    stage: "Seed",
    industry: "Logistics",
    rating: 4.5,
    founder: "Jane Doe",
    description: "Optimizing routes and inventory using ML models.",
    image: "https://placehold.co/600x400/111/fff?text=SparkTech",
    founderId: 2,
  },
  {
    id: 2,
    name: "EcoFinance",
    tagline: "Green loans made easy",
    status: "Pending",
    stage: "Series A",
    industry: "FinTech",
    rating: 3.9,
    founder: "Emeka Obi",
    description: "Helping users invest in climate-positive startups.",
    image: "https://placehold.co/600x400/222/fff?text=EcoFinance",
    founderId: 1,
  },
  {
    id: 3,
    name: "SparkTech AI",
    tagline: "AI for smarter logistics",
    status: "Approved",
    stage: "Seed",
    industry: "Logistics",
    rating: 4.5,
    founder: "Jane Doe",
    description: "Optimizing routes and inventory using ML models.",
    image: "https://placehold.co/600x400/111/fff?text=SparkTech",
    founderId: 5,
  },
  // Add more dummy entries as needed
];

export default function Startups({user, startups}) {
  const [showFilters, setShowFilters] = useState(false);
  const authUserId = 1; // Replace with actual auth user ID when available
  const [filteredStartups, setFilteredStartups] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showRateForm, setShowRateForm] = useState(false);
  const {offData} = useContext(OffCanvasContext)
  const auth = useAuth();

  useEffect(() => {
    console.log(startups)
    setIsLoading(false)
  }, [filteredStartups])

  return (
    <>
    {/* <OffCanvasProvider> */}
    <LandingLayout user={user?.user}>
    <Head title='Startups'/>
    <div className="min-h-screen flex flex-col items-center bg-[phi-white] text-white px-4 py-6 text-[0.7rem]">
      <div className="flex justify-between items-center mb-6 w-full max-w-7xl">
      <h1 className={`${headingClass} text-2xl`}>Explore Startups</h1>
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="lg:hidden flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-md"
      >
        {showFilters ? <FaTimes /> : <FaFilter />}
        {showFilters ? 'Close Filters' : 'Filters'}
      </button>
      </div>

      <div className="lg:grid grid-cols-11 gap-8 w-full max-w-7xl">
      {/* Filter Panel */}
      <Filters
        showFilters={showFilters}
        data={startups}
        filteredData={(e:any) => {setFilteredStartups(e)}}
      />

      {/* Startups Listing */}
      <div className="col-span-8 flex flex-col items-center">
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-2 justify-items-center">
        {
        isLoading ? (<p>Loading</p>) : (
          (filteredStartups || startups).length > 0 ? (
            (filteredStartups || startups).map((startup) => (
              <>
              <StartupCard
              key={startup.id}
              {...startup}
              authUserId={authUserId}
              more={startup.id}
              />
              </>
            ))
          ) : (
            emptyResult()
          )
        )
        }
        </div>
      </div>
      </div>
    </div>
    </LandingLayout>
    <Offcanvas
      isOpen={showRateForm}
      onClose={() => setShowRateForm(false)}
      title={`Rate Startup`}
    >
      <RateForm
      auth={auth.user}
      />
    </Offcanvas>
    {/* </OffCanvasProvider> */}
    </>
  );
}