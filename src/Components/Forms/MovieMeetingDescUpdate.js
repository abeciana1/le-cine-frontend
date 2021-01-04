import React from "react";
import { Editor } from "@tinymce/tinymce-react";
require("dotenv").config();

class MovieMeetingDescUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: this.props.html };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(content, editor) {
    console.log(content);
    console.log(editor);
    this.setState({ content });
  }

    render() {
    return (
      <React.Fragment>
        {/* <h4>rich text editor</h4> */}
        <Editor
          apiKey={process.env.REACT_APP_TINY_RTE_API_KEY}
          initialValue="<p>Create a description for your meeting</p>"
          value={this.state.content}
          init={{
                height: 500,
            menubar: false,
            // plugins: "link image code",
            plugins: [
              "advlist autolink lists",
              "charmap print preview anchor help",
              "searchreplace visualblocks code",
              "insertdatetime media table paste wordcount",
            ],
            toolbar:
              "undo redo | formatselect	| bold italic underline	| alignleft aligncenter alignright | link image mceCodeEditor |bullist numlist outdent indent strikethrough media | help",
            media_scripts: [{ filter: "http://media1.example.com" }],
          }}
          onEditorChange={this.handleChange}
        />
      </React.Fragment>
    );
  }
}

export default MovieMeetingDescUpdate
