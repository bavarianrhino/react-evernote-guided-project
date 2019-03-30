import React, { Component } from 'react';

class NoteEditor extends Component {

    constructor(props) {
        super(props)

        this.state = {
            inputTitle: props.getEditNote.title,
            inputBody: props.getEditNote.body
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            inputTitle: nextProps.getEditNote.title,
            inputBody: nextProps.getEditNote.body
        });
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const noteId = this.props.getEditNote.id
        const editedTitle = event.target.title.value
        const editedBody = event.target.body.value

        event.target.reset()

        this.props.saveEditedNote(noteId, editedTitle, editedBody)
    }

    handleCancel = () => {
        this.props.cancelEditedNote()
    }

    
    render() {
        return (
            <form className="note-editor" onSubmit={this.handleSubmit}>

                <input type="text" name="title" placeholder={this.state.inputTitle} />
                <textarea name="body" placeholder={this.state.inputBody} />

                <div className="button-row">
                    <input className="button" type="submit" value="Save" />
                    <button type="button" onClick={this.handleCancel}>Cancel</button>
                </div>

            </form>
        );
    }
}

export default NoteEditor;
