import React from "react";
import { Editor } from "@tinymce/tinymce-react";


class MovieMeetingDescCreate extends React.Component {
// const MovieMeetingDescCreate = (props) => {
    state = {
        content: ""
    };
    
    handleChange(content, editor) {
        this.setState({content});
    }

    render() {
    
        return (
            <React.Fragment>
                <h4>rich text editor</h4>
                <Editor 
                    apiKey={process.env.REACT_APP_TINY_RTE_API_KEY}
                    initialValue="<p>Create a description for your meeting</p>"
                    value={this.state.content}
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image', 
                            'charmap print preview anchor help',
                            'searchreplace visualblocks code',
                            'insertdatetime media table paste wordcount'
                        ],
                        toolbar:
                            'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent | help'
                        }}
                    onEditorChange={this.handleChange}
                />
            </React.Fragment>
        );
    }
}

export default MovieMeetingDescCreate;
