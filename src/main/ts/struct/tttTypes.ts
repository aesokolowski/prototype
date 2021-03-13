//  shared (or rather shareable) types
type XOrO = 'X' | 'O';
type Modes = '2-player' | 'Easy' | 'Hard';
type ResponseData = { board: string };

//  not exported
type ResetButtonStyles = 'ttt-reset-unlocked' | 'ttt-reset-locked';
type CelementStyles = 'ttt-celement-unplayed'| 'ttt-celement-played' | 'ttt-winner';

//  TicTacToe.tsx
type TicTacToeProps = { ids: string[][] };
type TicTacToeState = {
    currentTurn: XOrO,
    whoIsComputer: XOrO,
    isComputerTurn: boolean,
    computerJustMadeMove: boolean,
    turnMessage: string,
    // No way I'm going to bother enumerating possible board states, any board gets run through a gamut of tested
    // regexes at least once and should throw an exception if non-conforming
    board: string,
    mode: Modes,
    errorMessage: string,
    locked: boolean,
    counter: number,
    resetButtonStyle: ResetButtonStyles
};
type BoardReducer = (acc: string, ch: string, idx: number) => string;

//  TicTacRow.tsx
type TicTacRowProps = {
    idRow: string[],
    board: string,
    computerJustMadeMove: boolean,
    currentTurn: XOrO,
    changeTurn: (string) => void,
    isLocked: () => boolean
};

// TicTacCol.tsx
type TicTacColProps = {
    id: string,
    board: string,
    computerJustMadeMove: boolean,
    currentTurn: XOrO,
    changeTurn: (string) => void,
    isLocked: () => boolean
};
type TicTacColState = {
    isPlayed: boolean,
    playedBy: XOrO,
    board: string,
    gameOver: boolean,
    celementStyle: CelementStyles
};

// ResetButton
type ResetButtonProps = { buttonStyle: ResetButtonStyles, resetBoard: () => void };

// ModeSelect
type ModeSelectProps = { modeChanged: (modes) => void };
type ModeSelectState = { mode: Modes };

//  ModeSelectButton
type ModeSelectButtonProps = {
    isActive: boolean,
    mode: Modes,
    modeClicked: React.MouseEventHandler<HTMLDivElement>
};

// no matter how long this export list gets it's going to be on  one line until
// I get around to tweaking a script to accomodate multi-line export
// statements... which shouldn't be too hard but enough side tracking for
// now, brass tacks only 2021-08-03
export { XOrO, Modes, ResponseData, TicTacToeProps, TicTacToeState, BoardReducer, TicTacRowProps, TicTacColProps, TicTacColState, ResetButtonProps, ModeSelectProps, ModeSelectState, ModeSelectButtonProps };