import { Component } from "react";

import './styles.css';

export class Home extends Component {
    //
    state = {
        counter: 0
    }

    handeClick = () => {
        this.setState(
            (prevState, prevProps) => {
                return { counter: prevState.counter + prevProps.numberToIncrement }
            },
            () => {
                console.log('POST', this.state.counter);
            }
        );
    }

    render() {
        //
        return (
            <div className="container">
                <h1>{ this.state.counter }</h1>
                <button
                    conClick={this.handeClick}
                    >
                    Increment
                </button>
            </div>
        );
    }
}