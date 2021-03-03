import React from 'react';

type TicTacColProps = {
    id: string,
    currentTurn: 'X' | 'O',
    changeTurn: (string) => void
};
type TicTacColState = { isPlayed: boolean };

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

        this.state = { isPlayed: false };
        this.space = React.createRef();
        this.playSpace = this.playSpace.bind(this);
    }

    playSpace(e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>) {
        e.preventDefault();
        e.stopPropagation();

        if (!this.state.isPlayed) {
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