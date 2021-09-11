import React, { Component } from "react";

class ComplexTextBubble extends Component {
    render() {
        return (
            <div className="text-bubble text-bubble-chatbot text-bubble-complex">
                <div className="container">
                    <div className="row">
                        <img className="col-3 recipe-img" src={this.props.src} />
                        <div className="col">
                            <h3>{this.props.title}</h3>
                            <text>{this.props.text}</text>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ComplexTextBubble;