import React from 'react';

import { didIContribute } from '../../code/tttHelpers';

import { TicTacColProps, TicTacColState } from '../../struct/tttTypes';

interface TicTacCol {
    space: Ref<HTMLTableDataCellElement>
}

interface Ref<HTMLTableDataCellElement> {
    current: HTMLTableDataCellElement
}

class TicTacCol extends React.Component<TicTacColProps,
        TicTacColState> {
    constructor(props: TicTacColProps) {
        super(props);

        this.state = {
            isPlayed: false,
            playedBy: null,
            board: this.props.board,
            gameOver: false,
            celementStyle: 'ttt-celement-unplayed'
        };
        this.space = React.createRef();
        this.playSpace = this.playSpace.bind(this);
    }

    componentDidUpdate() {
        const empty = '---------'

        // reset
        if (this.props.board === empty && this.state.board !== empty) {
            this.setState({ isPlayed: false,
                playedBy: null,
                board: empty,
                gameOver: false,
                celementStyle: 'ttt-celement-unplayed'
            });
            this.space.current.innerText = '';  // I actually think I'm going
                                   // pull this one out and use the state,
                                   // will that enable me to get rid of the ref
                                   // entirely? I think I solved the problem the
                                   // ref was trying to solve by adding the board
                                   // prop which force-updated each of these components
        // update board state
        } else if (this.state.board != this.props.board) {
            this.setState({ board: this.props.board });
        // determine coloration on win
        } else if (this.props.isLocked() && this.state.gameOver === false) {
            this.setState({ gameOver: true });
            
            try {
                const contributor = didIContribute(this.state.board,
                        this.state.playedBy, this.space.current.id);

                if (contributor) {
                    this.setState({ celementStyle: 'ttt-winner' });
                } else {
                    this.setState({ celementStyle: 'ttt-celement-played' })
                }
            } catch (error: unknown) {
                console.error(error);
                // I want to print a message for this but I probably need to
                // pass a setError function from TicTacToe because that's
                // where the error messages are... not high priority right
                // now (with typescript it seems like it shouldn't come up
                // if I have no underlines? or at least lack of direct user
                // input [i.e. text or uploading a file])
            }
        }
    }

    playSpace(e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>) {
        e.preventDefault();
        e.stopPropagation();

        // only permit a space to be played if the game isn't over
        // or the space hasn't previously been played 
        if (!(this.props.isLocked() || this.state.isPlayed)) {
            this.space.current.innerText = this.props.currentTurn;  // change this!
            this.setState({
                isPlayed: true,
                playedBy: this.props.currentTurn,
                celementStyle: 'ttt-celement-played'
            });
            this.props.changeTurn(this.space.current.id);
        }
    }

    render() {
        return (
            <td className={this.state.celementStyle}
                id={this.props.id}
                ref={this.space}
                onClick={this.playSpace}>
            </td>
        );
    }
}

export default TicTacCol;