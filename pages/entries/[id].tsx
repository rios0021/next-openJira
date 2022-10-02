import { useState, ChangeEvent, useContext, useMemo, FC, PropsWithChildren } from 'react';
import { GetServerSideProps } from 'next'

import { Grid, Card, CardHeader, CardContent, TextField, CardActions, Button, FormControl, FormLabel, FormHelperText, RadioGroup, FormControlLabel, Radio, capitalize, IconButton } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Layout } from "../../components/layouts"
import { Entry, EntryStatus } from '../../interfaces';
import { EntriesContext } from '../../context/entries';
import { db, dbEntries } from '../../database';
import { useRouter } from 'next/router';
import { dateFunctions } from '../../utils';




interface Props {
    entry: Entry
}

const validStatus: EntryStatus[] = [ 'pending', 'in-progress', 'finished']

export const EntryPage:FC<PropsWithChildren<Props>> = ({entry}) => {
    

    const [inputValue, setInputValue] = useState(entry.description);
    const [status, setStatus] = useState<EntryStatus>( entry.status);
    const [touched, setTouched] = useState( false );
    const {updateEntry, deleteEntry} = useContext(EntriesContext)
    const isNotValid = useMemo(() => inputValue.trim().length<=0 && touched, [inputValue, touched])
    const router = useRouter();

    const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }
    const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value as EntryStatus)
    }
    const onSave = () =>{
        if(inputValue.trim().length === 0) return;
        const updatedEntry:Entry = {
            _id: entry._id,
            description: inputValue,
            createdAt: entry.createdAt,
            status
        }
        updateEntry(updatedEntry, true)
    }
    const onDeleteEntry = () => {
        deleteEntry(entry._id);
        router.push(`/`);
    }

    return (
        <Layout title={inputValue.substring(0,10) + '...'}>
            <Grid
                container
                justifyContent={"center"}
                sx={{marginTop:2}}
            >
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader 
                            title={`Entry:`}
                            subheader={`Created ${dateFunctions.getFormatDistanceToNow(entry.createdAt)} ago`}
                        />
                        <CardContent>
                            <TextField 
                                sx={{ marginTop: 2, marginBottom: 1}}
                                fullWidth
                                placeholder='New Entry'
                                autoFocus
                                multiline
                                label="New Entry"
                                value={inputValue}
                                onBlur={ () => setTouched(true)}
                                onChange={onTextChange}
                                helperText={ isNotValid &&'Enter some text'}
                                error={isNotValid}
                            />
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Status</FormLabel>
                                <RadioGroup 
                                    row
                                    value={status}
                                    onChange={onStatusChange}
                                >
                                    {
                                        validStatus.map( option => (
                                            <FormControlLabel 
                                                key={option} 
                                                value={option}
                                                control={ <Radio/>}
                                                label={capitalize(option)}
                                            />
                                        ))
                                    }
                                </RadioGroup>
                                <FormHelperText></FormHelperText>
                            </FormControl>
                        </CardContent>
                        <CardActions>
                            <Button
                                startIcon={<SaveOutlinedIcon/>}
                                variant="contained"
                                onClick={onSave}
                                disabled={inputValue.trim().length <= 0}
                            >
                                Save
                            </Button>
                            <IconButton 
                                sx={{
                                    marginLeft: 'auto!important',
                                    backgroundColor: 'red',
                                }}
                                onClick={onDeleteEntry}
                            >
                                <DeleteOutlineOutlinedIcon/>
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const {id} = ctx.params as {id:string};
    const entry = await dbEntries.getEntryById(id);

    if(!entry){
        return{
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    return{
        props:{
            entry
        }
    }

}




export default EntryPage;