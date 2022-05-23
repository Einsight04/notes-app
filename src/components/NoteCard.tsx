import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Typography from "@mui/material/Typography";
import Avatar from '@mui/material/Avatar';
import { yellow, green, pink, blue } from '@mui/material/colors';

type Props = {
    note: {
        title: string,
        details: string
        category: string,
        id: number,
    }
    handleDelete: (id: number) => void
}

const NoteCard = ({note, handleDelete}: Props): JSX.Element => {
    return (
        <div>
            <Card elevation={4} sx={note.category === 'work' ? {border: '2px solid red'} : {border: ''}}>
                <CardHeader
                    avatar={
                        <Avatar sx={() => {
                            if (note.category === 'work') {
                                return {backgroundColor: yellow[700]}
                            } else if (note.category === 'todos') {
                                return {backgroundColor: green[500]}
                            } else if (note.category === 'reminders') {
                                return {backgroundColor: pink[500]}
                            } else {
                                return {backgroundColor: blue[500]}
                            }
                        }}>
                            {note.category[0].toUpperCase()}
                        </Avatar>
                    }
                    title={note.title}
                    subheader={note.category}
                    action={
                        <IconButton>
                            <DeleteOutlineOutlinedIcon onClick={() => handleDelete(note.id)}/>
                        </IconButton>
                    }
                />
                <CardContent>
                    <Typography variant="body2">
                        {note.details}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default NoteCard;
