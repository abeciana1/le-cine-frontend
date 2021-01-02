import React from "react";
import ReactDOM from "react-dom"
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

class MovieMeetingDesc extends React.Component {

    state = {
        editorState: EditorState.createEmpty(),
        contentState: ContentState,
        desc: ""
    };

    onEditorStateChange = (editorState) => {
        this.setState({editorState})
    }

    onContentStateChange = (contentState) => {
        console.log(contentState)
        this.setState({contentState})
    }

    descChange = (e) => {
        let draftRef = this.refs.draftRef; 
        let draftDom = ReactDOM.findDOMNode( draftRef );
        let html = draftDom.querySelector("div[data-block] div[data-offset-key]").innerHTML;
        this.props.aboutHandler(html)
        this.setState({desc: html})

    }

    render() {
        console.log(this.state.desc)
        return (
        <React.Fragment>
                <h1>description</h1>
                <Editor
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={this.onEditorStateChange}
                    onContentStateChange={this.onContentStateChange}
                    value={this.state.desc}
                    onChange={this.descChange}
                    ref="draftRef"
                />
        </React.Fragment>
        );
    }
}

export default MovieMeetingDesc;