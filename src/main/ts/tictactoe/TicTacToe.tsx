import React from 'react';

import ModeSelect from './components/ModeSelect';
import ResetButton from './components/ResetButton';
import TicTacRow from './components/TicTacRow';

import { TicTacToeProps, TicTacToeState } from '../struct/tttTypes'

import { idToBoardIndex } from '../code/tttHelpers';
import { xWinConditions, oWinConditions } from '../struct/tttStructs';

// This component holds state which affects the whole board --
// the grandchild component TicTacCol holds state that only concerns
// any individual cell

const TURN_MSG = '\'s turn.',
      WIN_MSG = ' Wins!',
      ERR_MSG = 'Internal error. Try again, or try reloading the page.';

class TicTacToe extends React.Component<TicTacToeProps,
        TicTacToeState> {
    constructor(props: TicTacToeProps) {
        super(props);

        this.state = {
            currentTurn: 'X',
            turnMessage: 'X' + TURN_MSG,
            errorMessage: '',
            board: '---------',
            locked: false
        };
        this.changeTurn = this.changeTurn.bind(this);
        this.isLocked = this.isLocked.bind(this);
        this.resetBoard = this.resetBoard.bind(this);
        this.modeChanged = this.modeChanged.bind(this);
    }

    componentDidUpdate(prevProps: TicTacToeProps, prevState: TicTacToeState) {
        if (!this.state.locked) {
            this.runCheck();
        }
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

    checkForWin(conditions: RegExp[]) {
        for (let condition of conditions) {
            if (condition.test(this.state.board)) {
                return true;
            }
        }

        return false;
    }
    
    runCheck() {
        const didXWin = this.checkForWin(xWinConditions);

        if (!didXWin) {
            const didOWin = this.checkForWin(oWinConditions);

            if (didOWin) {
                this.setState({
                    turnMessage: 'O' + WIN_MSG,
                    errorMessage: '',
                    locked: true
                });
            }
        } else {
            this.setState({
                turnMessage: 'X' + WIN_MSG,
                errorMessage: '',
                locked: true
            });
        }
    }

    isLocked() {
        return this.state.locked;
    }

    resetBoard() {
        this.setState({
            currentTurn: 'X',
            turnMessage: 'X' + TURN_MSG,
            errorMessage: '',
            board: '---------',
            locked: false
        });
    }

    modeChanged(mode: '2-player' | 'Easy' | 'Hard') {
        console.log('detected mode change:', mode);
    }

    render() {
        return (
            <div>
                <div className="ttt-field">
                    <table>
                        <tbody>{
                            this.props.ids.map((idRow, idx) => (
                                <TicTacRow
                                    key={idx}
                                    idRow={idRow}
                                    board={this.state.board}
                                    currentTurn={this.state.currentTurn}
                                    changeTurn={this.changeTurn}
                                    isLocked={this.isLocked}
                                />
                            ))
                        }</tbody>
                    </table>
                    <aside className="ttt-sidebar">
                        <ModeSelect modeChanged={this.modeChanged} />
                        <ResetButton resetBoard={this.resetBoard} />
                    </aside>
                </div>
                <p>{this.state.turnMessage}</p>
                <p>{this.state.errorMessage}</p>
            </div>
        );
    }
}

export default TicTacToe;