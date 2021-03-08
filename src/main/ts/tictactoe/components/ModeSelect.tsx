import React from 'react';

type ModeSelectProps = {};
type ModeSelectState = {
    mode: '2-player' | 'Easy' | 'Hard'
};

class ModeSelect extends React.Component<ModeSelectProps,
        ModeSelectState> {
    constructor(props: ModeSelectProps) {
        super(props);

        this.state = { mode: '2-player' };
    }

    render() {
        return (
            <div className="ttt-mode-container">
                <p className="ttt-mode-item">
                    <input type="radio"
                        id="two-player"
                        name="mode"
                        value="2-player"
                    />
                    <label htmlFor="two-player">2 Player</label>
                </p>
                <p className="ttt-mode-item">
                    <input type="radio" id="easy" name="mode" value="Easy" />
                    <label htmlFor="easy">Easy</label>
                </p>
                <p className="ttt-mode-item">
                    <input type="radio" id="hard" name="mode" value="Hard" />
                    <label htmlFor="hard">Hard</label>
                </p>
            </div>
        );
    }
}

export default ModeSelect;