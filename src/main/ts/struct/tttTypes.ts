//  shared types
type xOrO = 'X' | 'O';
type Modes = '2-player' | 'Easy' | 'Hard';

//  TicTacToe.tsx
type TicTacToeProps = { ids: string[][] };
type TicTacToeState = {
    currentTurn: xOrO,
    turnMessage: string,
    //  No way I'm going to bother enumerating possible board states,
    //  any board gets run through a gamut of tested regexes at least once
    //  and should throw an exception if non-conforming
    board: string,
    errorMessage: string,
    locked: boolean
};

// TicTacRow.tsx
type TicTacRowProps = {
    idRow: string[];
    board: string,
    currentTurn: xOrO,
    changeTurn: (string) => void,
    isLocked: () => boolean
};

// TicTacCol.tsx
type TicTacColProps = {
    id: string,
    board: string,
    currentTurn: xOrO,
    changeTurn: (string) => void,
    isLocked: () => boolean
};

type TicTacColState = {
    isPlayed: boolean,
    playedBy: xOrO,
    board: string,
    gameOver: boolean
};

// ResetButton
type ResetButtonProps = {
    resetBoard: () => void
};

// ModeSelect
type ModeSelectProps = {
    modeChanged: (modes) => void
};
type ModeSelectState = {
    mode: Modes,
    counter: number
};

//  ModeSelectButton
type ModeSelectButtonProps = {
    id: number 
};
// no matter how long this export list gets it's going to be on  one line until
// I get around to tweaking a script to accomodate multi-line export
// statements... which shouldn't be too hard but enough side tracking for
// now, brass tacks only 2021-08-03
export { xOrO, Modes, TicTacToeProps, TicTacToeState, TicTacRowProps, TicTacColProps, TicTacColState, ResetButtonProps, ModeSelectProps, ModeSelectState, ModeSelectButtonProps };