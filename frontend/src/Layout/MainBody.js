import React, { Component } from "react";
import TextBubble from "../Components/TextBubble";
import ComplexTextBubble from "../Components/ComplexTextBubble";

import recipe1 from '../assets/recipe1.jpg'

class MainBody extends Component {
    render() {
        return (
            <div className="main-body">
                <TextBubble isUser={true} text={"Hello, this is a text bubble."} />
                <TextBubble isUser={false} text={"Hello, this is a text bubble."} />

                <ComplexTextBubble src={recipe1} text={"This is a complex bubble."} />
            </div>
        )
    }
}

export default MainBody;