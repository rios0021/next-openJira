import { ChangeEvent, useState, useContext } from 'react';

import { Box, Button, TextField } from "@mui/material"

import SaveIcon from '@mui/icons-material/Save';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';


export const NewEntry = () => {

    const {isAddingEntry, setIsAddingEntry} = useContext(UIContext)
    const [inputValue, setinputValue] = useState('');
    const [touched, setTouched] = useState( false );
    const {addEntry} = useContext(EntriesContext)
    

    const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setinputValue(event.target.value)
    }

    const onSave = () => {
        if(inputValue.trim().length === 0) {
            setinputValue('');
            return;
        }
        addEntry(inputValue);
        setIsAddingEntry(false);
        setTouched(false);
        setinputValue('');

    }
    
        return (
            <Box
                sx={{
                marginBottom: 2,
                paddingX: 2
            }}
        >
            {
                isAddingEntry ?(
                    <>
                        <TextField
                            fullWidth
                            sx={{ marginTop: 2, marginBottom: 1}}
                            placeholder= 'New Entry'
                            autoFocus
                            multiline
                            label='New Entry'
                            error={inputValue.length <= 0 && touched}
                            helperText={inputValue.length <= 0 && touched && 'Add some text'}
                            value={inputValue}
                            onChange={onTextChange}
                            onBlur={() => setTouched(true)}
                        />
                        <Box display='flex' justifyContent='space-around'>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => {setIsAddingEntry(false); setinputValue(''); setTouched(false);}}
                                >
                                Cancel
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                endIcon={<SaveIcon/>}
                                onClick={onSave}
                                >
                                Save
                            </Button>
                        </Box>
                    </>
                )
                : (
                    <Button
                        startIcon={<AddCircleOutlineIcon/>}
                        fullWidth
                        variant="outlined"
                        onClick={() => setIsAddingEntry(true)}
                    >
                        Add a new Entry
                    </Button>
                )
            }
        </Box>
    )
}