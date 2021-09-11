import React, { Component } from "react";

class ComplexTextBubble extends Component {
    render() {
        return (
            <div className="text-bubble text-bubble-complex">
                <img className="recipe-img" src={this.props.src} />
                <p>{this.props.text}</p>
            </div>
        )
    }
}

export default ComplexTextBubble;