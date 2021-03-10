import React from 'react';

import { ResetButtonProps } from '../../struct/tttTypes';

const ResetButton: React.FunctionComponent<ResetButtonProps> =
        ({ children, resetBoard }) => (
    <button type="button" className="ttt-button" onClick={resetBoard}>
        Reset
    </button>
);

export default ResetButton;