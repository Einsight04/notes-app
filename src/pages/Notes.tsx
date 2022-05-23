import React, {SetStateAction, useEffect, useState} from 'react'
import Masonry from 'react-masonry-css';
import NoteCard from '../components/NoteCard'
import Container from "@mui/material/Container";

const Notes = () => {
    interface Note {
        title: string,
        details: string
        category: string,
        id: number,
    }

    const [notes, setNotes] = useState<Note[]>([])

    const fetchData = async () => {
        const response: Response = await fetch('http://localhost:8000/notes');
        const data: SetStateAction<Note[]> = await response.json();

        setNotes(data);
    }

    useEffect(() => {
        fetchData()
            .catch(console.error);
    }, [])

    const handleDelete = async (id: number) => {
        await fetch(`http://localhost:8000/notes/${id}`, {method: 'DELETE',})
            .catch(console.error);

        const newNotes = notes.filter(note => note.id !== id);
        setNotes(newNotes);
    }

    const breakPoints = {
        default: 3,
        1100: 2,
        700: 1
    }

    return (
        <Container>
            <Masonry
                breakpointCols={breakPoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {notes.map(note => (

                    <div key={note.id}>
                        <NoteCard note={note} handleDelete={handleDelete}/>
                    </div>

                ))}
            </Masonry>
        </Container>
    );
}

export default Notes;