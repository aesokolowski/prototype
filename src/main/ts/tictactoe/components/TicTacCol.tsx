import React from 'react';

import { didIContribute, idToBoardIndex, findBoardDelta } from '../../code/tttHelpers';

import { TicTacColProps, TicTacColState } from '../../struct/tttTypes';

class TicTacCol extends React.Component<TicTacColProps, TicTacColState> {
    constructor(props: TicTacColProps) {
        super(props);

        this.state = {
            isPlayed: false,
            playedBy: null,
            board: this.props.board,
            gameOver: false,
            celementStyle: 'ttt-celement-unplayed'
        };
        this.playSpace = this.playSpace.bind(this);
    }

    // debating whether I should save this.props.whatever or
    // this.state.whatever gets used a lot to variables called whatever, but
    // honestly I kind of prefer to keep props and state alone so I don't
    // confuse assignment with referencing, so this might be an exception
    // to my normal rule
    componentDidUpdate(prevProps: TicTacColProps) {
        const empty = '---------'

        // detect computer move and respond to it
        if (this.props.computerJustMadeMove && !prevProps.computerJustMadeMove) {
            const boardIndex = idToBoardIndex(this.props.id);

            // DEBUG: need to detect how the two boards are different

            //this.props.changeTurn(this.props.id);
        }

        // reset
        if (this.props.board === empty && this.state.board !== empty) {
            this.setState({
                isPlayed: false,
                playedBy: null,
                board: empty,
                gameOver: false,
                celementStyle: 'ttt-celement-unplayed'
            });
        // update board state
        } else if (this.state.board != this.props.board) {
            this.setState({ board: this.props.board });

            if (this.props.computerJustMadeMove && !prevProps.computerJustMadeMove) {
                const boardIndex = idToBoardIndex(this.props.id);
                const deltaIndex = findBoardDelta(this.props.board, prevProps.board);

                if (boardIndex === deltaIndex) {
                    this.setState({
                        isPlayed: true,
                        playedBy: this.props.currentTurn,
                        celementStyle: 'ttt-celement-played'
                    });
                    this.props.changeTurn(this.props.id);
                }
            
            }   // determine coloration on win
        } else if (this.props.isLocked() && this.state.gameOver === false) {
            this.setState({ gameOver: true });
            
            try {
                const contributor = didIContribute(this.state.board, this.state.playedBy, this.props.id);

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

        const target = e.target as HTMLTableDataCellElement;

        // only permit a space to be played if the game isn't over
        // or the space hasn't previously been played 
        if (!(this.props.isLocked() || this.state.isPlayed)) {
            this.setState({
                isPlayed: true,
                playedBy: this.props.currentTurn,
                celementStyle: 'ttt-celement-played'
            });
            this.props.changeTurn(target.id);
        }
    }


    render() {
        return (
            <td className={this.state.celementStyle} id={this.props.id} onClick={this.playSpace}>
                {this.state.playedBy}
            </td>
        );
    }
}

export default TicTacCol;