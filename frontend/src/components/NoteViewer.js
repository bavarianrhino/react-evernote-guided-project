import React, { Fragment } from 'react';

const NoteViewer = (props) => {

    let handleEditClickEvent = () => {
        props.toggleEditState(props.getSelectedNote)
    }

    let handleDeleteClickEvent = () => {
        props.deleteSelectedNote(props.getSelectedNote)
    }

    return (
        <Fragment>
            <h2>{props.getSelectedNote.title}</h2>
            <p>{props.getSelectedNote.body}</p>
            <button onClick={handleEditClickEvent}>Edit</button>
            <button onClick={handleDeleteClickEvent}>Delete</button>
        </Fragment>
    );
}

export default NoteViewer;
