import { advisorUrl, appUrl } from "@/app";
import { Link, router } from "@inertiajs/react";
import { Empty } from "antd";
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

// tailwind components end

export const formClass = "bg-[#1b1b1b] border border-gray-700 text-white p-2 rounded-md"
export const buttonClass = "bg-[#00ffb3] hover:bg-[#a76e3d] hover:text-white text-black font-semibold py-2 px-4 rounded-md transitions duration-200";
export const inputClass = (width = 'w-full') => {
    return(`${width} bg-[#232323] border border-gray-600 text-white p-2 rounded-md focus:outline-none focus:${colorMap.border_primary}`)
};
export const labelClass = "block text-sm font-medium text-gray-300 mb-1";
export const cardClass = (col?: any) => {
    return `bg-[#222] flex border border-gray-700 rounded-lg shadow-md p-4${col ? ` col-span-${col}` : ''} text-center m-1 min-h-50 items-center`;
};
export const linkClass = "text-blue-400 hover:underline hover:text-blue-300 transitions duration-200";
export const errorClass = "text-red-500 text-sm mt-1";
export const successClass = "text-green-500 text-sm mt-1";
export const sectionClass = "mb-6";
export const headingClass = "text-xl font-bold text-white mb-2";
export const textareaClass = "bg-[#232323] border border-gray-600 text-white p-2 rounded-md w-full min-h-[80px] focus:outline-none focus:border-blue-500";
export const selectClass = "bg-[#232323] border border-gray-600 text-white p-2 rounded-md focus:outline-none focus:border-blue-500";
export const iconButtonClass = "p-2 rounded-full hover:bg-gray-700 transitions duration-200 text-gray-300";
export const dividerClass = "border-t border-gray-700 my-4";
export const smallTextClass = "text-xs text-gray-400";
export const modalClass = "fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50";
export const modalContentClass = "bg-[#232323] rounded-lg p-6 shadow-lg border border-gray-700";
export const tableClass = "min-w-full bg-[#232323] border border-gray-700 rounded-md";
export const tableHeaderClass = "bg-[#1b1b1b] text-gray-300 font-semibold";
export const tableCellClass = "px-4 py-2 border-b border-gray-700";
export const badgeClass = (type:string) => {
    return(
        `inline-block px-2 py-1 rounded ${type === 'success' ? 'bg-blue-700' : 'bg-red-700'} text-white text-xs font-semibold`
    )
}
export const disabledClass = "opacity-50 cursor-not-allowed";
export const containerDiv = "container inline-flex border border-gray-500 rounded-lg p-2 bg-[#1b1b1b]"
export const hoverClass = (color:string) => {return(`hover:bg-${color}-500`)}
export const startupCardClass = "bg-[#1e1e1e] border border-gray-700 rounded-lg p-4 text-white hover:shadow-lg transition";
export const startupTitleClass = "text-lg font-semibold mb-1";
export const startupMetaClass = "text-sm text-gray-400";
export const tagClass = "bg-blue-900 text-white text-xs rounded-full px-2 py-1 mr-1";
export const centerFocus = (extra:string = 'null') => {
    return(
        `${extra} min-h-screen bg-[#0f0f0f] text-white flex flex-col items-center justify-center px-4 py-8`
    )
}
export const startupInfo = () => {
    return(`border border-1 hover:border-[#00ffb3] rounded-md hover:rounded hover:text-white hover:opacity-100 m-1 p-2 transitions duration-200`)
}




export const ItemView = (
    item: string,
    data: string[] | number[] | string | number | undefined
): React.ReactElement => {
    if (Array.isArray(data)) {
        if (item === 'Attachments') {
            if (data.length > 0) {
                return (
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            {data.map((record: any, key: number) => {
                                const ext = typeof record === 'string' ? record.split('.').pop()?.toLowerCase() : '';
                                let icon = '';
                                switch (ext) {
                                    case 'pdf':
                                        icon = '📄';
                                        break;
                                    case 'doc':
                                    case 'docx':
                                        icon = '📝';
                                        break;
                                    case 'xlsx':
                                        icon = '📊';
                                        break;
                                    case 'ppt':
                                        icon = '📈';
                                        break;
                                    case 'txt':
                                        icon = '📃';
                                        break;
                                    case 'gif':
                                        icon = '🖼️';
                                        break;
                                    default:
                                        icon = '📎';
                                }
                                return (
                                    <a
                                        key={key}
                                        href={`${appUrl}/${record}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 mb-2 text-blue-400 hover:underline"
                                    >
                                        {icon} {record}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <p>No attachments available.</p>
                        </div>
                    </div>
                );
            }
        } else if (item === 'Images') {
            if (data.length > 0) {
                return (
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            {data.map((record: any, key: number) => (
                                <img
                                    key={key}
                                    src={`${appUrl}/${record}`}
                                    alt=""
                                    className="max-w-xs rounded mb-2"
                                />
                            ))}
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <p>There are no Images in this Newsletter</p>
                        </div>
                    </div>
                );
            }
        }
    } else if (typeof data === 'string' || typeof data === 'number') {
        return (
            <div className="space-y-4">
                {typeof data === 'string' ? (
                    <span dangerouslySetInnerHTML={{ __html: data }} />
                ) : (
                    <span>{data}</span>
                )}
            </div>
        );
    } else {
        return (
            <div className="space-y-4">
                <div className="flex flex-col">
                    <p>No data available.</p>
                </div>
            </div>
        );
    }
};


// styles.ts


// tailwind components end

export const guestCheck = (auth:any, destination:string = '/advisor/dashboard') => {
    if(auth){
        window.location.href = destination;
        toast.success('You are signed in')
        return null
    }
}

export const authCheck = (auth:any, destination:string = '/advisor/login') => {
    if(!auth){
        window.location.href = destination;
        toast.success('Login to continue')
        return null
    }
}



export const colorMap = {
    bg_primary: "bg-[#00ffb3]",
    bg_secondary: "bg-[#a76e3d]",
    bg_dark: "bg-[#0d0f11]",
    text_primary: "text-[#00ffb3]",
    text_secondary: "text-[#a76e3d]",
    text_dark: "text-[#0d0f11]",
    text_danger: "text-[var(--danger)]",
    border_primary: "border-[#00ffb3]",
    border_secondary: "border-[#a76e3d]",
    border_dark: "border-[#0d0f11]",
    border_danger: "border-[var(--danger)]"
}
// 

export const emptyResult = () => {
    return(
        <div className="flex col-span-3 flex-col items-center justify-center w-full">
            <Empty/>
        </div>
    )
}



export const classMap = {
  form: "bg-[#1b1b1b] border border-gray-700 text-white p-2 rounded-md",

  button: (bg?:string, hover?:string, text?:string, textsize?:string, direction?:string) => `${bg ? bg : 'bg-transparent'} hover:bg-[#00ffb3] hover:${text ? text : 'text-black'} text-white border-2 border-[#00ffb3]/30 ${textsize} font-semibold py-2 px-4 m-1 
  ${direction === 'left' ? 'rounded-l-2xl rounded-e-none' : 'rounded-l-none rounded-e-2xl'} hover:rounded-none transitions duration-300`,

  input: (width = 'w-full') =>
    `${width} px-4 py-3 rounded-md bg-[#1e1f22] text-white placeholder-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-[#00d2ff]`,

  label: () => "block text-sm font-medium text-gray-300 mt-2 mb-1",

  card: (col?: number | string) =>
    `bg-[#222] flex border border-gray-700 rounded-lg shadow-md p-4${col ? ` col-span-${col}` : ''} text-center m-1 min-h-50 items-center`,

  link: "text-blue-400 hover:underline hover:text-blue-300 transitions duration-200",

  error: "text-red-500 text-sm mt-1",

  success: "text-green-500 text-sm mt-1",

  section: "mb-6",

  heading: "text-xl font-bold text-white mb-2",

  textarea: "bg-[#232323] border border-gray-600 text-white p-2 rounded-md w-full min-h-[80px] focus:outline-none focus:border-blue-500",

  select: "bg-[#232323] border border-gray-600 text-white p-2 rounded-md focus:outline-none focus:border-blue-500",

  iconButton: "p-2 rounded-full hover:bg-gray-700 transitions duration-200 text-gray-300",

  divider: "border-t border-gray-700 my-4",

  smallText: "text-xs text-gray-400",

  modal: "fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50",

  modalContent: "bg-[#232323] rounded-lg p-6 shadow-lg border border-gray-700",

  table: "min-w-full bg-[#232323] border border-gray-700 rounded-md",

  tableHeader: "bg-[#1b1b1b] text-gray-300 font-semibold",

  tableCell: "px-4 py-2 border-b border-gray-700",

  badge: (type: "success" | "error" = "success") =>
    `inline-block px-2 py-1 rounded ${type === 'success' ? 'bg-blue-700' : 'bg-red-700'} text-white text-xs font-semibold`,

  disabled: "opacity-50 cursor-not-allowed",

  container: "container inline-flex border border-gray-500 rounded-lg p-2 bg-[#1b1b1b]",

  hover: (color: string = 'blue') => `hover:bg-${color}-500`,

  startupCard: "bg-[#1e1e1e] border border-gray-700 rounded-lg p-4 text-white hover:shadow-lg transition",

  startupTitle: "text-lg font-semibold mb-1",

  startupMeta: "text-sm text-gray-400",

  tag: "bg-blue-900 text-white text-xs rounded-full px-2 py-1 mr-1",

  centerFocus: (extra: string = '') =>
    `${extra} min-h-screen bg-[#0f0f0f] text-white flex flex-col items-center justify-center px-4 py-8`,

  startupInfo:
    "border border-1 hover:border-[#00ffb3] rounded-md hover:rounded hover:text-white hover:opacity-100 m-1 p-1 transitions duration-200",

    pageSection: () => "bg-[#1a1a1a] p-4 rounded-md shadow",

    pageHeader: () => "text-lg font-semibold mb-2",

    commentBox: (sender:boolean = true, responder:boolean = false) => {
        
    },

    hoverBg: () => `hover:${colorMap.bg_primary}`,

    hoverAnimate: () => `hover:rounded hover:${colorMap.border_primary} hover:text-white hover:w-[99%] hover:opacity-100 m-1 p-1 transitions duration-500`,

    hoverImg: () => `hover:w-[99%] transitions duration-500`,

    tooltip: () => `absolute left-0 bottom-full -translate-x-1/8 ml-2 w-47 p-2 text-[0.3em] border rounded shadow-md opacity-0 group-hover:opacity-100 group-hover:bg-[var(--color-muted)] group-hover:text-[var(--primary)] group-focus-within:opacity-100 group-focus-within:bg-[var(--color-muted)] group-focus-within:text-[var(--primary)] transition-opacity duration-200 z-100 pointer-events-none group-hober:pointer-events-none`,

    cardTitle: () => `text-xl font-semibold text-[#00ffb3] cursor-pointer inline`,

    tooltipBtn: () => `${classMap.iconButton}, inline text-gray-500 italic bg-transparent hover:bg-transparent cursor-pointer`
};

export const viewStartup = async (startup_id:any, user_id:any, guest:boolean) => {


    if(guest){
        
        const oldId = localStorage.getItem('view_id');

        oldId ?? localStorage.setItem('view_id', user_id)

        const resp = await axios.post(`${advisorUrl}/startup/view`, {
            'startup_id': startup_id,
            'user_id': oldId ? oldId : user_id,
            'guest': guest
        })

        console.log(resp)

    }else{
        const resp = await axios.post(`${advisorUrl}/startup/view`, {
            'startup_id': startup_id,
            'user_id': user_id,
            'guest': guest
        })
    }
    

}

export const likeStartup = async (startup_id:any, user_id:any, guest:boolean) => {


    if(guest){
        
        router.visit(`${advisorUrl}/login`)

    }else{
        const resp = await axios.post(`${advisorUrl}/startup/like`, {
            'startup_id': startup_id,
            'user_id': user_id,
            'guest': guest
        })
    }
    

}


export const random = (max:any) => {
    const rand = Math.random().toString(36).substring(2, max)
    return rand;
}

export const getData = async (url, id, method = 'post') => {
    const data = await (method == 'get' ? 
    axios.get(`${advisorUrl}/${url}/${id ? id : ''}`) : 
    axios.post(`${advisorUrl}/${url}/${id ? id : ''}`))

    return data
}


export const NotAuth = ({action = 'Continue'}) => {
    return(
        <div className={classMap.pageSection()}>
            <h1 
            className="text-gray-400"
            >
                <Link 
            href={`${advisorUrl}/login`}
            className={classMap.link}
            >Register</Link> or <Link 
            href={`${advisorUrl}/login`}
            className={classMap.link}
            >Login</Link> to {action}
            </h1>
        </div>
    )
}

export const hiddenNotAuth = ({children}) => {
    return(
        <Link
            href={`${advisorUrl}/login`}
            >
                {children}
        </Link>
    )
}