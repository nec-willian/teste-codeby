import React from "react";
import classNames from "classnames";
import Button from "./Button";
import CartItem from "./CartItem";
import axios from "axios";
import _ from "lodash";
import Alert from "./Alert";

interface IResponseCartItems {
    uniqueId: string;
    id: string;
    productId: string;
    productRefId?: string;
    name: string;
    price: number;
    sellingPrice: number;
    imageUrl: string;
}

interface IResponseCartTotalizers {
    id: string;
    name: string;
    value: number;
}

interface IResponseCart {
    value: number;
    items: Array<IResponseCartItems>;
    totalizers: Array<IResponseCartTotalizers>;
}

export default class Cart extends React.Component<any, {}> {
    public state = {
        show: this.props.show ?? false,
        loading: false,
        cartItems: [] as Array<IResponseCartItems>,
        totals: {
            value: 0,
            items: 0,
            discount: 0,
        },
    };

    componentDidMount() {
        this.loadItems();
    }

    componentDidUpdate() {
        if (this.props.show !== this.state.show) {
            this.setState({ show: this.props.show ?? false }, () => {
                if (this.props.show == true) {
                    this.loadItems();
                }
            });
        }
    }

    loadItems = () => {
        this.setState({ loading: true });
        axios
            .get<IResponseCart>(this.props.url)
            .then((res) => {
                this.setState({
                    cartItems: res.data.items,
                    totals: {
                        value: res.data.value / 100,
                        items: (_.find(res.data.totalizers, { id: "Items" })?.value ?? 0) / 100,
                        discounts: (_.find(res.data.totalizers, { id: "Discounts" })?.value ?? 0) / 100,
                    },
                });
            })
            .catch(() => {})
            .finally(() => {
                this.setState({ loading: false });
            });
    };

    renderItemList = () => {
        const output = [];
        for (var i in this.state.cartItems) {
            const item = this.state.cartItems[i];
            output.push(<CartItem name={item.name} price={item.sellingPrice} total={item.price} image={item.imageUrl} key={i} />);
        }
        return output;
    };

    floatToReal(value: number) {
        return value?.toFixed(2).replace(".", ",");
    }

    render() {
        if (!this.state.show) {
            return null;
        }
        return (
            <div className="cart-wrapper">
                <div
                    className={classNames({
                        open: this.state.show,
                        loading: this.state.loading,
                        cart: true,
                    })}>
                    {this.state.loading == true && (
                        <div className="lds-ring">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    )}
                    {this.state.loading == false && (
                        <>
                            <div className="cart-header">Meu carrinho</div>
                            <div className="cart-list">{this.renderItemList()}</div>
                            <div className="cart-sum">
                                <div className="cart-sum-items">
                                    <div className="cart-sum-text">Total</div>
                                    <div className="cart-sum-value">R$ {this.floatToReal(this.state.totals?.value ?? 0)}</div>
                                </div>
                                {this.state.totals?.value >= 10 && <Alert>Parabéns, sua compra tem frete grátis !</Alert>}
                            </div>
                            <div className="cart-footer">
                                <Button onClick={this.props.onSubmit}>Finalizar compra</Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    }
}
