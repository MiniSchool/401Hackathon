import React, { Component } from "react";

class OptionButton extends Component {
    render() {
        return (
            <button type="button" className="btn btn-secondary response-button" onClick={this.props.sendClick}>{this.props.text}</button>
        )
    }
}

export default OptionButton;