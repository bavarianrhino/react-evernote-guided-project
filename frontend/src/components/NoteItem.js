import React from 'react';

const NoteItem = (props) => {

    let handleClickEvent = () => {
        props.showClickedNote(props.note)
    }

    return (
        <li onClick={handleClickEvent}>
            <h2>{props.note.title}</h2>
            <p>{props.note.body.slice(0, 16)}...</p>
        </li>
    );
};

export default NoteItem;
