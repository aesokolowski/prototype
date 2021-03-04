import React from 'react';

import TicTacRow from './components/TicTacRow';

import { idToBoardIndex } from '../code/tttHelpers';

type TicTacToeProps = { ids: string[][] };
// This component holds state which affects the whole board --
// the grandchild component TicTacCol holds state that only concerns
// any individual cell
type TicTacToeState = {
    currentTurn: 'X' | 'O',
    turnMessage: string,
    board: string,
    errorMessage: string
};

const TURN_MSG = '\'s turn.';
const ERR_MSG = 'Internal error. Try again, or try reloading the page.';

class TicTacToe extends React.Component<TicTacToeProps,
        TicTacToeState> {
    constructor(props: TicTacToeProps) {
        super(props);

        this.state = {
            currentTurn: 'X',
            turnMessage: 'X' + TURN_MSG,
            errorMessage: '',
            board: '---------'
        };
        this.changeTurn = this.changeTurn.bind(this);
    }

    componentDidUpdate(prevProps: TicTacToeProps, prevState: TicTacToeState) {
        console.log('prevState:');
        console.dir(prevState);
        console.log('this.state:');
        console.dir(this.state);
    }

    changeTurn(id: string) {
        try {
            const boardIndex = idToBoardIndex(id);
            const callback = (acc: string, ch: string, idx: number) =>
                    acc + (idx === boardIndex ? this.state.currentTurn : ch);

            if (this.state.currentTurn == 'X') {
                this.setState({
                    currentTurn: 'O',
                    turnMessage: 'O' + TURN_MSG,
                    errorMessage: '',
                    board: this.state.board.split('').reduce(callback, '')
                });
            } else {
                    this.setState({
                    currentTurn: 'X',
                    turnMessage: 'X' + TURN_MSG,
                    errorMessage: '',
                    board: this.state.board.split('').reduce(callback, '')
                });
            }
        } catch (error: unknown) {
            console.error(error);
            this.setState({ errorMessage: ERR_MSG });
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
                <p>{this.state.errorMessage}</p>
            </div>
        );
    }
}

export default TicTacToe;