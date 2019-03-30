import React, { Component } from 'react';
import NoteEditor from './NoteEditor';
import NoteViewer from './NoteViewer';
import Instructions from './Instructions';

class Content extends Component {

    renderContent = (props) => {
        if (this.props.getEditStatus) {
            return <NoteEditor getEditNote={this.props.getEditNote} saveEditedNote={this.props.saveEditedNote} cancelEditedNote={this.props.cancelEditedNote} />;
        } else if (this.props.getSelectedNote) {
            return <NoteViewer getSelectedNote={this.props.getSelectedNote} toggleEditState={this.props.toggleEditState} deleteSelectedNote={this.props.deleteSelectedNote} />;
        } else {
            return <Instructions />;
        }
    }

    render() {
        return (
            <div className='master-detail-element detail'>
                {this.renderContent()}
            </div>
        );
    }
}

export default Content;
