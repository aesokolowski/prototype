import React from 'react';

import { Modes, ModeSelectProps, ModeSelectState } from '../../struct/tttTypes';

import ModeSelectButton from './ModeSelectButton';

const modeArray: Modes[] = ['2-player', 'Easy', 'Hard'];

class ModeSelect extends React.Component<ModeSelectProps, ModeSelectState> {
    constructor(props: ModeSelectProps) {
        super(props);

        this.state = { mode: '2-player' };
        this.modeClicked = this.modeClicked.bind(this);
    }

    modeClicked(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.preventDefault();
        e.stopPropagation();

        const target = e.target as HTMLDivElement;
        const id = target.id;

        if (id !== this.state.mode) {
            this.setState({ mode: id as Modes });
            this.props.modeChanged(id);
        }
    }

    render() {
        return (
            <div className="ttt-mode-container">{
                modeArray.map(
                    (mode, idx) => <ModeSelectButton
                        key={idx}
                        isActive={mode === this.state.mode}
                        mode={modeArray[idx]}
                        modeClicked={this.modeClicked}
                    />
                )
            }</div>
        );
    }
}

export default ModeSelect;