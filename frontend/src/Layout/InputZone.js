import React, { Component } from "react";
import TextInputBox from '../Components/TextInputBox'

class InputZone extends Component {
    render() {
        return (
            <div>
                <TextInputBox />
                <button type="button" className="btn btn-outline-dark input-button">Send</button>

            </div>
        )
    }
}

export default InputZone;