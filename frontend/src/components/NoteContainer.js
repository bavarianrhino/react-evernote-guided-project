import React, { Component, Fragment } from 'react';
import Search from './Search';
import Sidebar from './Sidebar';
import Content from './Content';

const JSONAPI = 'http://localhost:3000/api/v1/notes'

class NoteContainer extends Component {

    state = {
        notes: [],
        selectedNote: false,
        editMode: false,
        editNote: null,
        searchTerm: ''
    }

    componentDidMount() {
        this.renderNotes()
    }

    fetchNotes = () => {
        return fetch(JSONAPI).then(res => res.json())
    }

    renderNotes = () => {
        this.fetchNotes().then(noteData => {
            const notesAddData = noteData.map(note => ({ ...note, beingEdited: false }))
            console.log(notesAddData)
            this.setState({ notes: notesAddData })
            // this.setState({ notes: [...noteData] })
        })
    }

    handleSearch = (e) => {
        this.setState({ searchTerm: e.target.value })

    }

    showClickedNote = (note) => {
        this.setState({ selectedNote: note, editMode: false, editNote: null })
        // const selectedNote = this.state.notes.find(n => n.id === note.id)
    }

    getSelectedNote = () => {
        return this.state.selectedNote
    }

    getEditStatus = () => {
        return this.state.editMode
    }

    // getEditNote = () => {
    //     return this.state.editNote
    // }

    // toggleEditState = (editNote) => {
    //     // console.log(editNote)
    //     const changeEditState = this.state.notes.map(n => (n.id === editNote.id ? ({ ...n, beingEdited: true }) : n))
    //     // console.log(changeEditState)
    //     this.setState({ notes: changeEditState }, () => console.log(this.state.notes.find((n) => n.id === editNote.id)))
    // }

    toggleEditState = (editedNote) => {
        this.setState({ editMode: !this.state.editMode, editNote: editedNote }, () => this.getEditNote(editedNote))
    }

    getEditNote = (note) => {
        console.log(note)
        console.log(this.state.editNote)
        return this.state.editNote
    }

    saveEditedNote = (noteId, editedTitle, editedBody) => {
        fetch(JSONAPI + `/${noteId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
                title: editedTitle,
                body: editedBody
            })
        })
        .then(res => res.json())
        .then((resObj) => {
            this.renderNotes()
            
            const changeEditNotes = this.state.notes.map(n => (n.id === resObj.id ? ({ ...n, title: resObj.title, body: resObj.body }) : n))
            this.setState({ notes: changeEditNotes, editMode: false, editNote: null, selectedNote: false })
            // this.setState({ notes: changeEditNotes })

            // let newlyEditedNote = this.state.notes.find(n => n.id === resObj.id)
            // newlyEditedNote.title = resObj.title
            // newlyEditedNote.body = resObj.body
            
            // this.setState({ })
            // let updatedNote = resObj
            // let noteToUpdate = this.state.notes.find((note) => {
            //     return note.id == updatedNote.id

            // })
            // noteToUpdate.title = updatedNote.title
            // noteToUpdate.body = updatedNote.body
            // this.setState({
            //     notes: this.state.notes
            // })
        })
    }

    cancelEditedNote = () => {
        this.setState({ editMode: false, editNote: null })
    }

    handleNewNote = () => {
        let newTitle = 'New Note!'
        let newBody = 'Edit me here...'
        fetch(JSONAPI, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
                title: newTitle,
                body: newBody,
                user_id: 1
            })
        })
        .then(res => res.json())
        .then((resObj) => {
            console.log(resObj)
            this.renderNotes()
        })
    }

    deleteSelectedNote = (selectedNote) => {
        fetch(JSONAPI + `/${selectedNote.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
        })
        .then(res => res.json())
        .then((resObj) => {
            console.log(resObj)
            this.renderNotes()
            this.setState({ selectedNote: false })
        })
    }

    render() {  

        const searchedNotes = this.state.notes.filter(n => (n.body.includes(this.state.searchTerm) || n.title.includes(this.state.searchTerm)))
        
        return (
            <Fragment>
                <Search handleSearch={this.handleSearch} searchTerm={this.state.searchTerm} />
                <div className='container'>
                    <Sidebar notes={searchedNotes} showClickedNote={this.showClickedNote} handleNewNote={this.handleNewNote} />
                    <Content getSelectedNote={this.getSelectedNote()} 
                             getEditStatus={this.getEditStatus()} 
                             toggleEditState={this.toggleEditState} 
                             getEditNote={this.getEditNote()} 
                             saveEditedNote={this.saveEditedNote} 
                             cancelEditedNote={this.cancelEditedNote}
                             deleteSelectedNote={this.deleteSelectedNote} />
                </div>
            </Fragment>
        );
    }
}

export default NoteContainer;
