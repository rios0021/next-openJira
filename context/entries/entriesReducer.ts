import { EntriesState } from './'
import { Entry } from '../../interfaces';

type EntriesActionType = 
| {type: '[Entries] - Add Entry', payload: Entry}
| {type: '[Entries] - Update Entry', payload: Entry}
| {type: '[Entries] - Delete Entry', payload: Entry}
| {type: '[Entries] - Refresh Entries', payload: Entry[]}

export const entriesReducer = (state: EntriesState, action: EntriesActionType):EntriesState => {
    switch (action.type) {
        case  '[Entries] - Add Entry':
            return{
                ...state,
                entries: [ ...state.entries, action.payload]
            }
        case  '[Entries] - Update Entry':
            return{
                ...state,
                entries: state.entries.map(entry => {
                    // entry._id === action.payload._id ? action.payload : entry
                    if(entry._id === action.payload._id){
                        entry.status = action.payload.status;
                        entry.description = action.payload.description;
                    }
                    return entry;
                })
            }
        case '[Entries] - Delete Entry':
            return{
                ...state,
                entries: state.entries.filter(entry => entry._id != action.payload._id)
            }
        case '[Entries] - Refresh Entries':
            return{
                ...state,
                entries: [...action.payload]
            }
        default:
            return state;
    }
}