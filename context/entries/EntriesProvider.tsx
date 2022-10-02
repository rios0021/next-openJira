import { FC, PropsWithChildren, useReducer, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';
import { entriesApi } from '../../apis';

export interface EntriesState {
    entries: Entry[];
}
const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [],
}


export const EntriesProvider:FC<PropsWithChildren> = ({children}) => {
    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE)
    const { enqueueSnackbar } = useSnackbar();

    const addEntry = async(description: string) => {
        try {
            
            const {data} = await entriesApi.post<Entry>('/entries', {
                description
            });
    
            dispatch({
                type:'[Entries] - Add Entry',
                payload: data
            })
        } catch (error) {
            console.log('Error while saving in the database!')
        }
    }
    const updateEntry = async(entry:Entry, showSnackbar = false) => {
        const {data} = await entriesApi.put<Entry>(`/entries/${entry._id}`,{
            description: entry.description,
            status: entry.status
        })
        dispatch({
            type: '[Entries] - Update Entry',
            payload: data
        })
        if(showSnackbar){
            enqueueSnackbar('Entry updated',{
                variant: 'success',
                autoHideDuration:1500,
                anchorOrigin:{
                    vertical:'top',
                    horizontal:'right'
                }
            })
        }
    }
    
    const deleteEntry = async(id:string ) => {
        const {data} = await entriesApi.delete<Entry>(`/entries/${id}`)
        dispatch({
            type: '[Entries] - Delete Entry',
            payload: data
        })
        enqueueSnackbar('Entry Deleted!',{
            variant: 'warning',
            autoHideDuration:1500,
            anchorOrigin:{
                vertical:'top',
                horizontal:'right'
            }
        })
        
    }
    
    const refreshEntries = async() => {
        const {data} = await entriesApi.get<Entry[]>('/entries');
        dispatch({
            type: '[Entries] - Refresh Entries',
            payload: data
        })
    }
    
    useEffect(() => {
        refreshEntries();
    }, []);
    return (
        <EntriesContext.Provider value={{
            ...state,
            // Methods
            addEntry,
            updateEntry,
            deleteEntry
        }}>
            {children}
        </EntriesContext.Provider>
    )
}