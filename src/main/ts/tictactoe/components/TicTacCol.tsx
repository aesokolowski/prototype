import React from 'react';

import { didIContribute } from '../../code/tttHelpers'

type TicTacColProps = {
    id: string,
    board: string,
    currentTurn: 'X' | 'O',
    changeTurn: (string) => void,
    isLocked: () => boolean
};
type TicTacColState = {
    isPlayed: boolean,
    playedBy: 'X' | 'O' | null,
    board: string,
    gameOver: boolean
};

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
            gameOver: false
        };
        this.space = React.createRef();
        this.playSpace = this.playSpace.bind(this);
    }

    componentDidUpdate() {
        const empty = '---------'

        if (this.props.board === empty && this.state.board !== empty) {
            this.setState({ isPlayed: false,
                playedBy: null,
                board: empty,
                gameOver: false
            });
            this.space.current.innerText = '';
            this.space.current.className = 'ttt-celement';
        } else if (this.state.board != this.props.board) {
            this.setState({ board: this.props.board });
        } else if (this.props.isLocked() && this.state.gameOver === false) {
            this.setState({ gameOver: true });
            
            try {
                const contributor = didIContribute(this.state.board,
                        this.state.playedBy, this.space.current.id);

                if (contributor) {
                    this.space.current.className = 'ttt-winner';
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

        // only permit a space to be played if the game isn't over
        // or the space hasn't previously been played 
        if (!(this.props.isLocked() || this.state.isPlayed)) {
            this.space.current.innerText = this.props.currentTurn;
            this.setState({
                isPlayed: true,
                playedBy: this.props.currentTurn
            });
            this.props.changeTurn(this.space.current.id);
        }
    }

    render() {
        return (
            <td className="ttt-celement"
                id={this.props.id}
                ref={this.space}
                onClick={this.playSpace}>
            </td>
        );
    }
}

export default TicTacCol;