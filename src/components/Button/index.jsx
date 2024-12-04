import { Component } from "react";

export class Button extends Component {
    render() {
        //Obtendo o valor da propriedade text do button do arquivo da home
        const { text, onClick } = this.props;

        //Inserindo o valor da propridade no botão em si
        return (
            <button 
                onClick={onClick}
            >
                { text }
            </button>
        );
    }
}