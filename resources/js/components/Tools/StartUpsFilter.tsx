import React, { useEffect } from "react"
import { buttonClass, inputClass } from "./Misc"
import { IoReload, IoReloadCircle } from "react-icons/io5"

type Props = {
    showFilters: boolean,
    data: {},
    filteredData?: CallableFunction
}

const Filters = ({showFilters, data, filteredData}:Props) => {
    const [search, setSearch] = React.useState({
        text_search: '',
        stage: '',
        industry: '',
    })


    const filterData = (search:any) => {
        if (!data || !Array.isArray((data as any))) return;

        const filtered = (data as any).filter((startup: any) => {
            const matchesText = search.text_search === '' ||
                (startup.name && startup.name.toLowerCase().includes(search.text_search.toLowerCase()));
            const matchesStage = search.stage === '' || startup.stage.toLowerCase() === search.stage.toLowerCase();
            const matchesIndustry = search.industry === '' || startup.industry.toLowerCase() === search.industry.toLowerCase();
            return matchesText && matchesStage && matchesIndustry;
        });

        // You can call a prop function or set a state here to send filtered data to the parent/front end
        filteredData(filtered)
    }
    return(
        <div
          className={`${
            showFilters ? 'block' : 'hidden'
          } lg:block col-span-3 bg-[#1a1a1a] border border-gray-700 p-4 rounded-md`}
        >
          <div className="flex flex-row items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Filter Startups</h2>
            <button onClick={() => {
                setSearch({text_search: '', stage: '', industry: ''}),
                filterData(search)
            }}>
                <IoReload className="text-gray-500 text-lg hover:text-red-500"/>
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-1">Search</label>
            <input type="search" className={inputClass()} name="" id="" 
            value={search.text_search}
            onChange={e => {
                setSearch({ ...search, text_search: e.target.value })
            }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-1">Stage</label>
            <select 
            className={inputClass()}
            value={search.stage}
            onChange={e => setSearch({...search, stage: e.target.value})}
            >
              <option value="">Any</option>
              <option value="seed">Seed</option>
              <option value="series-a">Series A</option>
              <option value="series-b">Series B</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-1">Industry</label>
            <select className={inputClass()}
            value={search.industry}
            onChange={e => setSearch({...search, industry: e.target.value})}
            >
              <option value="">All</option>
              <option value="fintech">FinTech</option>
              <option value="logistics">Logistics</option>
              <option value="edtech">EdTech</option>
            </select>
          </div>

          <button 
          onClick={(e:any) => filterData(search)}
          className={`${buttonClass} w-full`}>Apply Filters</button>
        </div>
    )
}

export default Filters