import { xWinConditions, oWinConditions } from '../struct/tttStructs'

// generates the IDs for the tic-tac-toe spaces used in TSX and CSS
const generateIds = () => {
    const prefix = 'ttt-cell';
    const list: string[][] = [[]];

    for (let i = 0; i < 3; i++) {
        const row = (new Number(i)).toString();
        const rowArray: string[] = [];

        for (let j = 0; j < 3; j++) {
            rowArray.push(prefix + row + (new Number(j)).toString());
        }

        list.push(rowArray);
    }

    return list;
};

// converts coordinate ID to eqivalent index of a Board string
const idToBoardIndex = (id: string) => {
    const coords = id.slice(8);
    let boardIndex: number;

    switch (coords) {
        case '00':
            boardIndex = 0;
            break;
        case '01':
            boardIndex = 1;
            break;
        case '02':
            boardIndex = 2;
            break;
        case '10':
            boardIndex = 3;
            break;
        case '11':
            boardIndex = 4;
            break;
        case '12':
            boardIndex = 5;
            break;
        case '20':
            boardIndex = 6;
            break;
        case '21':
            boardIndex = 7;
            break;
        case '22':
            boardIndex = 8;
            break;
        default:
            throw Error('Invalid board coordinates "' + boardIndex +
                    '" @tttHelpers::idToBoardIndex.');
    }

    return boardIndex;
};

const didIContribute = (
    board: string,
    playedBy: 'X' | 'O' | null,
    id: string
) => {
    if (playedBy === 'X') {
        for (let condition of xWinConditions) {
            if (condition.test(board) &&
                    didIReallyContribute(board, id, 'X')) {
                return true;
            }
        }
    } else if (playedBy === 'O') {
        for (let condition of oWinConditions) {
            if (condition.test(board) &&
                    didIReallyContribute(board, id, 'O')) {
                return true;
            }
        }
    }

    return false
};

const didIReallyContribute = (
    board: string,
    id: string,
    playedBy: 'X' | 'O'
) => {
    switch (id) {
        case 'ttt-cell00':
            if (topRow(board, playedBy) || leftColumn(board, playedBy) ||
                    backSlash(board, playedBy)) {
                return true;
            }

            break;
        case 'ttt-cell01':
            if (topRow(board, playedBy) || middleColumn(board, playedBy)) {
                return true;
            }

            break;
        case 'ttt-cell02':
            if (topRow(board, playedBy) || rightColumn(board, playedBy) ||
                    fowardSlash(board, playedBy)) {
                return true;
            }

            break;
        case 'ttt-cell10':
            if (middleRow(board, playedBy) || leftColumn(board, playedBy)) {
                return true;
            }

            break;
        case 'ttt-cell11':
            if (middleRow(board, playedBy) ||
                    middleColumn(board, playedBy) ||
                    backSlash(board, playedBy) ||
                    fowardSlash(board, playedBy)) {
                return true;
            }

            break;
        case 'ttt-cell12':
            if (middleRow(board, playedBy) || rightColumn(board, playedBy)) {
                return true;
            }

            break;
        case 'ttt-cell20':
            if (bottomRow(board, playedBy) || leftColumn(board, playedBy) ||
                    fowardSlash(board, playedBy)) {
                return true;
            }

            break;
        case 'ttt-cell21':
            if (bottomRow(board, playedBy) || middleColumn(board, playedBy)) {
                return true;
            }
            break;
        case 'ttt-cell22':
            if (bottomRow(board, playedBy) || rightColumn(board, playedBy) ||
                    backSlash(board, playedBy)) {
                return true;
            }
            break;
        default:
            throw new Error('Invalid cell id "' + id +
                    '"@tttHelpers::didIReallyContribute');
    }

    return false;
};

const topRow = (board: string, playedBy: 'X' | 'O') => {
    if (board[0] === playedBy && board[1] === playedBy &&
            board[2] === playedBy) {
        return true;
    }

    return false;
};

const middleRow = (board: string, playedBy: 'X' | 'O') => {
    if (board[3] === playedBy && board[4] === playedBy &&
            board[5] === playedBy) {
        return true;
    }

    return false;
};

const bottomRow = (board: string, playedBy: 'X' | 'O') => {
    if (board[6] === playedBy && board[7] === playedBy &&
            board[8] === playedBy) {
        return true;
    }

    return false;
};

const leftColumn = (board: string, playedBy: 'X' | 'O') => {
    if (board[0] === playedBy && board[3] === playedBy &&
            board[6] === playedBy) {
        return true;
    }

    return false;
};

const middleColumn = (board: string, playedBy: 'X' | 'O') => {
    if (board[1] === playedBy && board[4] === playedBy &&
            board[7] === playedBy) {
        return true;
    }

    return false;
};

const rightColumn = (board: string, playedBy: 'X' | 'O') => {
    if (board[2] === playedBy && board[5] === playedBy &&
            board[8] === playedBy) {
        return true;
    }

    return false;
};

const backSlash = (board: string, playedBy: 'X' | 'O') => {
    if (board[0] === playedBy && board[4] === playedBy &&
            board[8] === playedBy) {
        return true;
    }

    return false;
};

const fowardSlash = (board: string, playedBy: 'X' | 'O') => {
    if (board[2] === playedBy && board[4] === playedBy &&
           board[6] === playedBy) {
        return true;
    }

    return false;
};

export { generateIds, idToBoardIndex, didIContribute };