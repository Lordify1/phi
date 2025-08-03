import { createContext, useState } from "react";

export const OffCanvasContext = createContext({
    showOffCanvas: false,
    setShowOffCanvas: null
})

export const OffCanvasProvider = ({children}) => {
    const [showOffCanvas, setShowOffCanvas] = useState(false)

    return(
        <OffCanvasContext.Provider
        value={{showOffCanvas, setShowOffCanvas}}
        >
            {children}
        </OffCanvasContext.Provider>
    )
}