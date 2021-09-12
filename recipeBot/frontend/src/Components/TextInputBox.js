import React, { Component } from "react";

class TextInputBox extends Component {
    // getInputText() {
    //     const value = document.getElementById("text-input").value;
    //     return (value);
    // }
    textRef = React.createRef();

    handleEnter(e) {
        //Enter pressed
        if (e.key === "Enter") {
            document.getElementById("send-button").click();
        }
    }


    render() {
        return (
            <div className="reply-zone">
                <div className="input-group mb-3 input-box zone-center">
                    <input id="text-input" type="text" className="form-control" placeholder="Chat with me" aria-label="Chat with Me" aria-describedby="send-button" onKeyPress={this.handleEnter} ref={this.textRef} />
                    <button className="btn btn-secondary" type="submit" id="send-button" onClick={e => this.props.sendClick(this.textRef.current.value)} >Send</button>
                </div>
            </div>
        )
    }
}

export default TextInputBox;