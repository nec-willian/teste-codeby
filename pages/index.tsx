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
                
                    {this.state.cartOpenType == false && <>
                        <Button onClick={() => this.setState({ cartOpenType: "acima" })} style={{ marginRight: 10 }}>
                            Abrir carrinho ( valor maior que R$10 )
                        </Button>
                        <Button onClick={() => this.setState({ cartOpenType: "abaixo" })}>Abrir carrinho ( valor menor que R$10 )</Button>
                        <div style={{ fontWeight: "bold", marginTop: 5 }}>(Clique no "finalizar compra" para fechar o modal)</div>
                    </>}
                

                <Cart url={"/api/" + this.state.cartOpenType} onSubmit={() => this.setState({ cartOpenType: false })} show={this.state.cartOpenType !== false} />
            </div>
        );
    }
}
