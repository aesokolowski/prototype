import React from 'react';

import TicTacRow from './components/TicTacRow';

type TicTacToeProps = { ids: string[][] };
type TicTacToeState = {
    currentTurn: 'X' | 'O',
    turnMessage: string
};

const TURN_MSG = '\'s turn.'

class TicTacToe extends React.Component<TicTacToeProps,
        TicTacToeState> {
    constructor(props: TicTacToeProps) {
        super(props);

        this.state = { currentTurn: 'X', turnMessage: 'X' + TURN_MSG };
        this.changeTurn = this.changeTurn.bind(this);
    }

    changeTurn(id: string) {
        if (this.state.currentTurn == 'X') {
            this.setState({ currentTurn: 'O', turnMessage: 'O' + TURN_MSG });
        } else {
            this.setState({ currentTurn: 'X', turnMessage: 'X' + TURN_MSG });
        }
    }

    render() {
        return (
            <div>
                <table>
                    <tbody>{
                        this.props.ids.map((idRow, idx) => (
                            <TicTacRow
                                key={idx}
                                idRow={idRow}
                                currentTurn={this.state.currentTurn}
                                changeTurn={this.changeTurn}
                            />
                        ))
                    }</tbody>
                </table>
                <p>{this.state.turnMessage}</p>
            </div>
        );
    }
}

export default TicTacToe;