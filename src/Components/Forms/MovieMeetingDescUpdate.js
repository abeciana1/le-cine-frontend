import React from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

class MovieMeetingDescUpdate extends React.Component {

    state = {
        editorState: EditorState.createEmpty()
    };
    
    onEditorStateChange = (editorState) => {
        this.setState({ editorState })
        // debugger
        //   console.log(this.refs.editor.refs.editor.innerHTML);

    }

    render() {
        return (
        <React.Fragment>
                <Editor
                    editorState={this.state.editorState}
                />
        </React.Fragment>
        );
    }
}

export default MovieMeetingDescUpdate;