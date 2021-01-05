import React from "react";
import { Editor } from "@tinymce/tinymce-react";
require("dotenv").config();

class MovieMeetingDescCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: this.props.html };

    this.handleChange = this.handleChange.bind(this);
  }

    handleChange(content, editor) {
        this.setState({ content });
        this.props.aboutHandler(content)
  }
    
    

    render() {
    return (
      <React.Fragment>
        <Editor
            apiKey={process.env.REACT_APP_TINY_RTE_API_KEY}
            hasFocus={true}    
          value={this.state.content}
          init={{
            selector: ["textarea.tox-textarea", "div.tox-textfield"],
            height: 500,
            plugins:
              "advlist autolink lists code media charmap print preview anchor help searchreplace visualblocks insertdatetime table paste wordcount",
            toolbar:
              "undo redo | formatselect fontsizeselect | removeformat | bold italic underline	| alignleft aligncenter alignright | link image mceCodeEditor |bullist numlist outdent indent strikethrough media code | help",
          }}
          onEditorChange={this.handleChange}
        />
      </React.Fragment>
    );
  }
}

export default MovieMeetingDescCreate

// import React from "react";

// class MovieMeetingDescCreate extends React.Component {



//     render() {
//         return (
//             <h4>text editor</h4>
//         )
//     }
// }

// export default MovieMeetingDescCreate
