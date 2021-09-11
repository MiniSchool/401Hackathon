import React, { Component } from "react";
import TextBubble from "../Components/TextBubble";
import ComplexTextBubble from "../Components/ComplexTextBubble";

import recipe1 from '../assets/recipe1.jpg'

class MainBody extends Component {
    render() {
        let lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
        let ingredient = `3 Tbsp. kosher salt, plus more
        4 oz.guanciale(salt - cured pork jowl), pancetta(Italian bacon), or bacon
        2 oz.Parmesan
        4 large egg yolks
        2 large eggs
        Freshly ground black pepper
        1 Tbsp.extra - virgin olive oil
        1 lb.spaghetti, bucatini, or rigatoni`;

        return (
            <div className="main-body">
                <TextBubble isUser={true} text={lorem} />
                <TextBubble isUser={false} text={lorem} />

                <ComplexTextBubble src={recipe1} title={"Simple Carbonara"} text={lorem} />
            </div>
        )
    }
}

export default MainBody;