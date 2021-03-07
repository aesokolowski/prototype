import React from 'react';

type TicTacColProps = {
    id: string,
    board: string,
    currentTurn: 'X' | 'O',
    changeTurn: (string) => void,
    isLocked: () => boolean
};
type TicTacColState = { isPlayed: boolean, board: string };

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

        this.state = { isPlayed: false, board: this.props.board };
        this.space = React.createRef();
        this.playSpace = this.playSpace.bind(this);
    }

    comoponentDidUpdate(prevProps: TicTacColProps, prevState: TicTacColState) {
        if (this.state.board != this.props.board) {
            this.setState({ board: this.props.board });
        }
    }

    playSpace(e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>) {
        e.preventDefault();

        // only permit a space to be played if the game isn't over
        // or the space hasn't previously been played 
        if (!(this.props.isLocked() || this.state.isPlayed)) {
            this.space.current.innerText = this.props.currentTurn;
            this.props.changeTurn(this.space.current.id);
            this.setState({ isPlayed: true });
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