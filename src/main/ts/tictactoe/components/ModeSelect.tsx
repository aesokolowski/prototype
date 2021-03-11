import React from 'react';

import {
    Modes,
    ModeSelectProps,
    ModeSelectState
} from '../../struct/tttTypes';

import ModeSelectButton from './ModeSelectButton';

const modeArray: Modes[] = ['2-player', 'Easy', 'Hard'];

class ModeSelect extends React.Component<ModeSelectProps, ModeSelectState> {
    constructor(props: ModeSelectProps) {
        super(props);

        this.state = { mode: '2-player', counter: 0 };
        this.modeClicked = this.modeClicked.bind(this);
    }

    componentDidUpdate(prevProps: ModeSelectProps, prevState: ModeSelectState) {

        // DEBUG
        console.log('this.state:');
        console.dir(this.state);
        console.log('prevState:');
        console.dir(prevState);
        // END DEBUG
    }

    modeClicked(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.preventDefault();
        e.stopPropagation();

        const target = e.target as HTMLDivElement;

        if (target.id !== this.state.mode) {
            this.setState({ mode: target.id as Modes });
            this.props.modeChanged(target.id);
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