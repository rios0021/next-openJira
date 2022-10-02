import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { DragEvent, FC, useContext } from 'react';
import { UIContext } from '../../context/ui';
import { Entry } from '../../interfaces';
import { dateFunctions } from '../../utils';

interface Props {
    entry: Entry
}

export const EntryCard:FC<Props> = ({entry}) => {

    const {startDragging, endDragging} = useContext(UIContext);
    const router = useRouter();
    const onDragStart = (event:DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('entryId', entry._id)
        startDragging();
    }

    const onDragEnd = () => {
        console.log('endDragging')
        endDragging();
    }
    const onClick = () => {
        router.push(`/entries/${entry._id}`)
    }

    return (
        <Card
            sx={{
                marginBottom: 1
            }}
            draggable
            onClick={onClick}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{whiteSoace: 'pre-line'}}>{entry.description}</Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2}}>
                    <Typography variant='body2'>{dateFunctions.getFormatDistanceToNow(entry.createdAt)} ago</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}