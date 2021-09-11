import React, { Component } from "react";

class TextInputBox extends Component {
    // getInputText() {
    //     const value = document.getElementById("text-input").value;
    //     return (value);
    // }
    textRef = React.createRef();

    render() {
        return (
            <div className="input-zone">
                <div className="input-group mb-3">
                    <input id="text-input" type="text" className="form-control" placeholder="Chat with me" aria-label="Chat with Me" aria-describedby="button-addon2" ref={this.textRef} />
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={e => this.props.sendClick(this.textRef.current.value)}>Send</button>
                </div>
            </div>
        )
    }
}

export default TextInputBox;