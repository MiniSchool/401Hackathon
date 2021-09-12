import React, { Component } from "react";
import OptionButton from "../Components/OptionButton";

class ButtonZone extends Component {
    render() {
        return (
            <div className="button-zone zone-center">
                {this.props.options.map((option, n) =>
                    <OptionButton key={n} text={option} sendClick={e => this.props.sendClick(option)} />
                )}
            </div>
        )
    }
}

export default ButtonZone;