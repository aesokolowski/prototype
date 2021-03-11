import React from 'react';

import { ModeSelectButtonProps } from '../../struct/tttTypes';

const ModeSelectButton: React.FunctionComponent<ModeSelectButtonProps> = ({ children, isActive, mode, modeClicked }) => 
    <div
        id={mode}
        className={isActive ? 'ttt-mode-button-active' : 'ttt-mode-button-inactive'}
        onClick={modeClicked}
    >
        {mode}
    </div>;

export default ModeSelectButton;