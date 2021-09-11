import React, { Component } from "react";
import MainBody from "./MainBody";
import InputZone from "./InputZone";
import TextInputBox from "../Components/TextInputBox";

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatHistory: [
                {
                    sendByUser: false,
                    text: "Greetings! I am a chatbot. "
                }
            ]
        }
    };

    handleSend(t) {

        let newMessage = {
            sendByUser: true,
            text: t
        }

        let chatbotMessage = {
            sendByUser: false,
            text: "This is a response from the chatbot."
        }

        let newChatHistory = this.state.chatHistory;

        newChatHistory.push(newMessage);
        newChatHistory.push(chatbotMessage);
        this.setState({
            chatHistory: newChatHistory
        })
    };

    render() {
        return (
            <div>
                <MainBody chatHistory={this.state.chatHistory} />
                {/* <InputZone sendClick={i => this.handleSend(i)} /> */}
                <TextInputBox sendClick={i => this.handleSend(i)} />
            </div>
        )
    }
}

export default Layout;