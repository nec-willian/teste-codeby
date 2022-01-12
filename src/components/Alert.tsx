import React from "react";
import classNames from "classnames";

export default class Alert extends React.Component<any, {}> {
    render() {
        return <div style={this.props.style} className={"alert"}>{this.props.children}</div>;
    }
}
