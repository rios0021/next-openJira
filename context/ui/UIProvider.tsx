import { stat } from 'fs';
import { FC, PropsWithChildren, useReducer } from 'react';
import { UIContext, uiReducer } from './';


export interface UIState {
    sidebarOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
}
const UI_INITIAL_STATE: UIState = {
    sidebarOpen: false,
    isAddingEntry: false,
    isDragging: false
}


export const UIProvider:FC<PropsWithChildren> = ({children}) => {
    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

    const openSidebar = () => {
        dispatch({ type: '[UI] - Open Sidebar'})
    }
    const closeSidebar = () => {
        dispatch({ type: '[UI] - Close Sidebar'})
    }
    const setIsAddingEntry = (value:boolean) => {
        dispatch({type: '[UI] - Change Adding Entry', payload: value})
    }
    const startDragging = () => {
        dispatch({type: '[UI] - Start Dragging'})
    }
    const endDragging = () => {
        dispatch({type: '[UI] - End Dragging'})
    }
    return (
        <UIContext.Provider value={{
            sidebarOpen: state.sidebarOpen,
            isAddingEntry: state.isAddingEntry,
            isDragging: state.isDragging,

            // Methods
            openSidebar,
            closeSidebar,
            setIsAddingEntry,
            startDragging,
            endDragging
        }}>
            {children}
        </UIContext.Provider>
    )
}