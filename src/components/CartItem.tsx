import React from "react";

export default class CartItem extends React.Component<any, {}> {

    floatToReal(value: number) {
        return value.toFixed(2).replace('.', ',');
    }

    render() {
        return (
            <div className="cart-item">
                <div className="cart-item-image">
                    <img src={this.props.image ?? "https://via.placeholder.com/100"} />
                </div>
                <div className="cart-item-info">
                    <div className="cart-item-name">{this.props.name ?? 'Produto sem nome'}</div>
                    <div className="cart-item-meta-price">R$ {this.floatToReal((this.props.total / 100) ?? 0)}</div>
                    <div className="cart-item-price">R$ {this.floatToReal((this.props.price / 100) ?? 0)}</div>
                </div>
            </div>
        );
    }
}
