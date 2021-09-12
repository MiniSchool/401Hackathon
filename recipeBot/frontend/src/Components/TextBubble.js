import React, { Component } from "react";

class TextBubble extends Component {
    componentDidMount() {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth"
        });

        const input = document.getElementById("text-input");
        if (input !== null) {
            document.getElementById("text-input").value = "";
            document.getElementById("text-input").focus();
        }

    }
    render() {
        return (
            <div className={this.props.isUser ? "text-bubble text-bubble-user" : "text-bubble text-bubble-chatbot"} >
                <p>{this.props.text}</p>
            </div>
        )
    }
}

export default TextBubble;