import React, { Component } from "react";
import TextInputBox from '../Components/TextInputBox'

class InputZone extends Component {
    render() {
        return (
            <TextInputBox sendClick={i => this.props.sendClick(i)} />
        )
    }
}

export default InputZone;