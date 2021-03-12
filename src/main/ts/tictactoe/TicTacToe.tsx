import axios from 'axios';
import React from 'react';

import ModeSelect from './components/ModeSelect';
import ResetButton from './components/ResetButton';
import TicTacRow from './components/TicTacRow';

import { Modes, TicTacToeProps, TicTacToeState, BoardReducer } from '../struct/tttTypes'

import { idToBoardIndex } from '../code/tttHelpers';
import { xWinConditions, oWinConditions, fullBoard } from '../struct/tttStructs';

// This component holds state which affects the whole board --
// the grandchild component TicTacCol holds state that only concerns
// any individual cell

const TURN_MSG = '\'s turn.',
      WIN_MSG = ' Wins!',
      TIE_MSG = 'Tie Game!',
      ERR_MSG = 'Internal error. Try again, or try reloading the page.';

class TicTacToe extends React.Component<TicTacToeProps, TicTacToeState> {
    constructor(props: TicTacToeProps) {
        super(props);

        this.state = {
            currentTurn: 'X',
            whoIsComputer: null,
            isComputerTurn: false,
            turnMessage: 'X' + TURN_MSG,
            errorMessage: '',
            board: '---------',
            mode: '2-player',
            locked: false,
            counter: 0,
            resetButtonStyle: 'ttt-reset-locked'
        };
        this.changeTurn = this.changeTurn.bind(this);
        this.isLocked = this.isLocked.bind(this);
        this.resetBoard = this.resetBoard.bind(this);
        this.modeChanged = this.modeChanged.bind(this);
    }

     async componentDidUpdate(prevProps: TicTacToeProps, prevState: TicTacToeState) {
        console.log('this.state.counter:', this.state.counter);

        //  react to mode change
        if (this.state.mode !== prevState.mode) {
            this.resetBoard();
            if (this.state.mode !== '2-player') {
                this.setState({
                    whoIsComputer: 'O'
                });
            } else {
                this.setState({ whoIsComputer: null });
            }
        //  check if anyone won
        } else if (!this.state.locked) {
            this.runCheck();
        //  check if full
        } else if (this.isFull() && this.state.turnMessage !== TIE_MSG) {
            this.setState({ turnMessage: TIE_MSG });
        }

        // probably will split this log out similar to toggle reset
        // button style method
        if (!this.state.isComputerTurn && this.state.currentTurn === this.state.whoIsComputer) {
            this.setState({ isComputerTurn: true, locked: true, turnMessage: 'Computer' + TURN_MSG });
        } else if(this.state.isComputerTurn && !prevState.isComputerTurn) {
            // and definitely split this out so this method doesn't have to itself be async,
            // just maybe call other async stuff -- with so much manipulation of props and
            // state it's not like I need to pass a bunch of stuff around
            const response = await axios.post('/api/tictactoe/easy', { board: this.state.board, playAs: this.state.whoIsComputer });

            console.log(response);
        }

        this.toggleResetButtonStyle();
    }

    changeTurn(id: string) {
        try {
            const boardIndex = idToBoardIndex(id);
            const callback: BoardReducer = (acc, ch, idx) => acc + (idx === boardIndex ? this.state.currentTurn : ch);

            // not sure I really need this... twoPlayerRoutine for all... if it works out,
            // then move its logic back in, if not, then write onePlayerRoutine or something
            switch(this.state.mode) {
                case '2-player':
                    this.twoPlayerRoutine(callback);
                    break;
                case 'Easy':
                    this.twoPlayerRoutine(callback);
                    break;
                case 'Hard':
                    this.twoPlayerRoutine(callback);
                    break;
                default:
                    throw Error('Invalid state "' + this.state.mode + '" @TicTacToe::changeTurn');
            }
        } catch (error: unknown) {
            console.error(error);
            this.setState({ errorMessage: ERR_MSG });
        }
    }

    twoPlayerRoutine(callback: BoardReducer) {
        if (this.state.currentTurn == 'X') {
            this.setState({
                currentTurn: 'O',
                turnMessage: 'O' + TURN_MSG,
                errorMessage: '',
                board: this.state.board.split('').reduce(callback, ''),
                counter: this.state.counter + 1
            });
        } else {
            this.setState({
                currentTurn: 'X',
                turnMessage: 'X' + TURN_MSG,
                errorMessage: '',
                board: this.state.board.split('').reduce(callback, ''),
                counter: this.state.counter + 1
            });
        }
    }

    //  on pause, trying another route
    easyRoutine(callback: (acc: string, ch: string, idx: number) => string) {
        if (this.state.currentTurn == 'X') {
        }
    }

    hardRoutine(callback) {
        alert('Hard mode!');
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

    isFull() {
        return fullBoard.test(this.state.board);
    }

    // can probably replace with sending this.state.locked as a prop, I believe this was a hack around an issue that
    // no longer exists
    isLocked() {
        return this.state.locked;
    }

    resetBoard() {
        this.setState({
            currentTurn: 'X',
            turnMessage: 'X' + TURN_MSG,
            errorMessage: '',
            board: '---------',
            locked: false,
            counter: 0
        });
    }

    modeChanged(mode: Modes) {
        this.setState({ mode });
    }

    toggleResetButtonStyle() {
        if (this.state.board === '---------' &&
                this.state.resetButtonStyle === 'ttt-reset-unlocked') {
            this.setState({ resetButtonStyle: 'ttt-reset-locked' });
        } else if (this.state.board !== '---------' &&
                this.state.resetButtonStyle === 'ttt-reset-locked') {
            this.setState({ resetButtonStyle: 'ttt-reset-unlocked'});
        }
    }

    render() {
        return (
            <div>
                <div className="ttt-field">
                    <table>
                        <tbody>{
                            this.props.ids.map(
                                (idRow, idx) => <TicTacRow
                                    key={idx}
                                    idRow={idRow}
                                    board={this.state.board}
                                    currentTurn={this.state.currentTurn}
                                    changeTurn={this.changeTurn}
                                    isLocked={this.isLocked}
                                />
                            )
                        }</tbody>
                    </table>
                    <aside className="ttt-sidebar">
                        <ModeSelect modeChanged={this.modeChanged} />
                        <ResetButton buttonStyle={this.state.resetButtonStyle} resetBoard={this.resetBoard}
                        />
                    </aside>
                </div>
                <p>{this.state.turnMessage}</p>
                <p>{this.state.errorMessage}</p>
            </div>
        );
    }
}

export default TicTacToe;