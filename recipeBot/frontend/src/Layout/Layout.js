import React, { Component } from "react";
import MainBody from "./MainBody";
import InputZone from "./InputZone";
import TextInputBox from "../Components/TextInputBox";
import ButtonZone from "./ButtonZone";

const axios = require('axios');

/**
 * Response types:
 *  0: text
 *  1: buttons
 */
class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatHistory: [
                {
                    sendByUser: false,
                    responseType: 0,
                    text: "Greetings! I am a chatbot. ",
                }
            ]
        }
    };

    handleSend(t) {
        let newChatHistory = this.state.chatHistory;

        let newMessage = {
            sendByUser: true,
            text: t,
        }

        // Development only
        let chatbotMessage = {
            sendByUser: false,
            responseType: newChatHistory.length % 3 % 2,
            responseOptions: ["Male", "Female", "Vegetarian", "Vegan"],
            text: "This is a response from the chatbot.",
        }

        newChatHistory.push(newMessage);
        newChatHistory.push(chatbotMessage);
        this.setState({
            chatHistory: newChatHistory
        })

        axios.post('', {
            firstName: 'Fred',
            lastName: 'Flintstone'
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

    };

    handleResponseOptions() {
        let latest = this.state.chatHistory.slice(-1)[0];
        switch (latest.responseType) {
            case 0:
                return (<TextInputBox sendClick={i => this.handleSend(i)} />);
            case 1:
                return (<ButtonZone sendClick={i => this.handleSend(i)} options={latest.responseOptions} />);
            default:
                return (<TextInputBox />);
        }
    }



    render() {
        return (
            <div>
                <MainBody chatHistory={this.state.chatHistory} />
                {/* <InputZone sendClick={i => this.handleSend(i)} /> */}
                <div className="reply-zone">
                    {/* <TextInputBox sendClick={i => this.handleSend(i)} /> */}
                    {this.handleResponseOptions()}
                </div>
            </div>
        )
    }
}

export default Layout;