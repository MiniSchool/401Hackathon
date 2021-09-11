import React, { Component } from "react";

class TextBubble extends Component {
    render() {
        return (
            <div className={this.props.isUser ? "text-bubble text-bubble-user" : "text-bubble text-bubble-chatbot"} >
                <p>{this.props.text}</p>
            </div>
        )
    }
}

export default TextBubble;