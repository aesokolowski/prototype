import React from 'react';

import { ResetButtonProps } from '../../struct/tttTypes';

const ResetButton: React.FunctionComponent<ResetButtonProps> =
        ({ children, buttonStyle, resetBoard }) => (
    <div
        id="reset-button"
        className={buttonStyle}
        onClick={resetBoard}
    >
        Reset
    </div>
);

export default ResetButton;