import React, { Component } from 'react';
import NoteList from './NoteList';

class Sidebar extends Component {

    // mapNotes = () => {
    //     return props.notes.map(note => {
    //         return <NoteList />
    //     })
    // }

    render() {
        return (
            <div className='master-detail-element sidebar'>
                <NoteList notes={this.props.notes} showClickedNote={this.props.showClickedNote}/>
                <button onClick={this.props.handleNewNote}>New Note</button>
            </div>
        );
    }
}

export default Sidebar;
