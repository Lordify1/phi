import { createContext, useContext, useState } from "react";
import axios from "axios";
import { advisorUrl } from "@/app";

const FetchContext = createContext();

export const FetchProvider = ({children}) => {
    const [store, setStore] = useState({});

    const fetchData = async ({key, url, formdata, method = 'post'}) => {
        if(method === 'post'){
            const data = await axios.post(`${advisorUrl}${url}`, formdata);
            setStore(prev => ({
                ...prev,
                [key]: data?.data?.[key]
            }));
            return data
        }else if(method === 'get'){
            const data = await axios.get(`${advisorUrl}${url}`, formdata);
            setStore(prev => ({
                ...prev,
                [key]: data?.data?.[key]
            }));
            return data
        }
    }


    return (
        <FetchContext.Provider value={{ store, fetchData }}>
            {children}
        </FetchContext.Provider>
    )

}

export const useFetch = () => useContext(FetchContext)