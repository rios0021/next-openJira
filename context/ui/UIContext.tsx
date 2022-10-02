import { createContext } from 'react';


interface ContextProps{
    sidebarOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
    // Methods
    openSidebar: () => void;
    closeSidebar: () => void;
    setIsAddingEntry: (value: boolean) => void;
    startDragging: () => void;
    endDragging: () => void;
}


export const UIContext  = createContext({} as ContextProps);