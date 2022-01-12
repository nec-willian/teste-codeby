import React from "react";
import classNames from "classnames";
import Button from "./Button";
import CartItem from "./CartItem";
import axios from "axios";
import _ from "lodash";

interface IResponseCartItems {
    uniqueId: string;
    id: string;
    productId: string;
    productRefId?: string;
    name: string;
    price: number;
    sellingPrice: number
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
        totals: {},
    };

    componentDidMount() {
        this.loadItems();
    }

    componentDidUpdate() {
        if (this.props.show !== this.state.show) {
            this.setState({ show: this.props.show ?? false },() => {
                if(this.props.show == true) {
                    this.loadItems();
                }
            });
        }
    }

    loadItems = () => {
        this.setState({ loading: true });
        axios
            .get<IResponseCart>(
                "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/11b895d0-bc64-4f3a-bfa9-7c652be8d415/acima-10-reais.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220112%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220112T192836Z&X-Amz-Expires=86400&X-Amz-Signature=1cb7359464adeefd56ca8c3408805ff6647d69566a8b8c9fd13a68efdd2f1a2d&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22acima-10-reais.json%22&x-id=GetObject",
            )
            .then((res) => {
                this.setState({
                    cartItems: res.data.items,
                    totals: {
                        value: res.data.value / 10,
                        items: (_.find(res.data.totalizers, { id: "Items" })?.value  ?? 0) / 10,
                        discounts: (_.find(res.data.totalizers, { id: "Discounts" })?.value ?? 0 ) / 10,
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
            output.push(<CartItem name={item.name} price={item.price}  image={item.imageUrl} key={i} />);
        }
        return output;
    };

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
                                <div className="cart-sum-text">Total</div>
                                <div className="cart-sum-value">R$ 9,55</div>
                            </div>
                            <div className="cart-footer">
                                <Button>Finalizar compra</Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    }
}
