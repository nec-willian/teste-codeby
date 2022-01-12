import React from "react";
import classNames from "classnames";

export default class Button extends React.Component<any, {}> {
    render() {
        return <div onClick={this.props.onClick} style={this.props.style} className={"button"}>{this.props.children}</div>;
    }
}
