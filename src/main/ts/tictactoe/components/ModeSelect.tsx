import React from 'react';

import {
    Modes,
    ModeSelectProps,
    ModeSelectState
} from '../../struct/tttTypes';

import ModeSelectButton from './ModeSelectButton';

interface ModeSelect {
    twoPlayerMode: Ref<HTMLInputElement>,
    easyMode: Ref<HTMLInputElement>,
    hardMode: Ref<HTMLInputElement>
}
interface Ref<HTMLInputElement> {
    current: HTMLInputElement
}

const modeArray: Modes[] = ['2-player', 'Easy', 'Hard'];

class ModeSelect extends React.Component<ModeSelectProps,
        ModeSelectState> {
    constructor(props: ModeSelectProps) {
        super(props);

        this.state = { mode: '2-player', counter: 0 };
        this.modeClicked = this.modeClicked.bind(this);
    }

    componentDidUpdate(prevProps: ModeSelectProps,
                prevState: ModeSelectState) {
        
        if (this.state.mode !== prevState.mode) {
            this.setState({ counter: this.state.counter + 1 } );
        }

        // DEBUG
        console.log('this.state:');
        console.dir(this.state);
        console.log('prevState:');
        console.dir(prevState);
        console.log('this.twoPlayerMode:');
        console.dir(this.twoPlayerMode);
        console.log('this.easyMode:');
        console.dir(this.easyMode);
        console.log('this.hardMode');
        console.dir(this.hardMode);
        // END DEBUG
    }

    modeClicked(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        e.stopPropagation();

        const target = e.target as HTMLInputElement;

        this.setState({
            mode: target.value as Modes
        });
        this.props.modeChanged(target.value);
    }

    render() {
        return (
            <div className="ttt-mode-container">{
                modeArray.map((mode, idx) =>
                    <ModeSelectButton key={idx} id={idx + 1}/>
                )
            }</div>
            /*
            <div className="ttt-mode-container">
                <input ref={this.twoPlayerMode}
                    type="radio"
                    id="two-player"
                    name="mode"
                    value="2-player"
                    onChange={this.modeClicked}
                    checked={this.state.mode === '2-player'}
                />
                <label htmlFor="two-player">2 Player</label>
                <input ref={this.easyMode}
                    type="radio"
                    id="easy"
                    name="mode"
                    value="Easy"
                    onChange={this.modeClicked}
                    checked={this.state.mode === 'Easy'}
                />
                <label htmlFor="easy">Easy</label>
                <input ref={this.hardMode}
                    type="radio"
                    id="hard"
                    name="mode"
                    value="Hard"
                    onChange={this.modeClicked}
                    checked={this.state.mode === 'Hard'}
                />
                <label htmlFor="hard">Hard</label>
            </div>
            */
        );
    }
}

export default ModeSelect;