import React, { Component } from "react";

class TextInputBox extends Component {
    render() {
        return (
            <div className="form-floating">
                <textarea className="form-control input-box" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                <label for="floatingTextarea">Comments</label>
            </div>
        )
    }
}

export default TextInputBox;