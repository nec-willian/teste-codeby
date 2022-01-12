import React from "react";

export default class CartItem extends React.Component<any, {}> {
    render() {
        return (
            <div className="cart-item">
                <div className="cart-item-image">
                    <img src="https://via.placeholder.com/100" />
                </div>
                <div className="cart-item-info">
                    <div className="cart-item-name">Nome do produto</div>
                    <div className="cart-item-meta-price">R$ 10,55</div>
                    <div className="cart-item-price">R$ 9,55</div>
                </div>
            </div>
        );
    }
}
