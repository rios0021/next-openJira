import { UIState } from "./"

type UIActionType = 
| {type: '[UI] - Open Sidebar'}
| {type: '[UI] - Close Sidebar'}
| {type: '[UI] - Change Adding Entry', payload:boolean}
| {type: '[UI] - Start Dragging'}
| {type: '[UI] - End Dragging'}

export const uiReducer = (state: UIState, action: UIActionType):UIState => {
    switch (action.type) {
        case  '[UI] - Open Sidebar':
            return{
                ...state,
                sidebarOpen: true,
            }
        case  '[UI] - Close Sidebar':
            return{
                ...state,
                sidebarOpen: false,
            }
        case  '[UI] - Change Adding Entry':
            return{
                ...state,
                isAddingEntry: action.payload,
            }
        case  '[UI] - Start Dragging':
            return{
                ...state,
                isDragging: true
            }
        case  '[UI] - End Dragging':
            return{
                ...state,
                isDragging: false
        }
        default:
            return state;
    }
}