import React from 'react';

type ResetButtonProps = {
    resetBoard: () => void
};

const ResetButton: React.FunctionComponent<ResetButtonProps> =
        ({ children, resetBoard }) => (
    <button type="button" className="ttt-button" onClick={resetBoard}>
        Reset
    </button>
);

export default ResetButton;