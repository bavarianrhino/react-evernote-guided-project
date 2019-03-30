import React from 'react';
import NoteItem from './NoteItem';

const NoteList = (props) => {

    let mapNotes = () => {
        return props.notes.map(note => {
            return <NoteItem key={note.id} note={note} showClickedNote={props.showClickedNote}/>
        })
    }

    return (
        <ul>
            {mapNotes()}
        </ul>
    );

}

export default NoteList;
