import React from "react";
import Button from "../src/components/Button";
import Cart from "../src/components/Cart";

export default class HomePage extends React.Component<any, {}> {
    public state = {
        cartOpenType: false,
    };

    render() {
        return (
            <div style={{ padding: 15 }}>
                {this.state.cartOpenType == false && (
                    <>
                        <Button onClick={() => this.setState({cartOpenType: 'maior'})} style={{ marginRight: 10 }}>Abrir carrinho ( frete {">="} 10R$ )</Button>
                        <Button onClick={() => this.setState({cartOpenType: 'menor'})}>Abrir carrinho ( frete {"<"} 10R$ )</Button>
                    </>
                )}
                <Cart show />
            </div>
        );
    }
}
