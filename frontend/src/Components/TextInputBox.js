import React, { Component } from "react";

class TextInputBox extends Component {
    render() {
        return (
            <div className="input-group input-box">
                <span className="input-group-text">Chat with Me</span>
                <textarea className="form-control" aria-label="With textarea"></textarea>
            </div>
        )
    }
}

export default TextInputBox;