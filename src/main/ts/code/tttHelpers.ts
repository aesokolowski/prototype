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
                    '" @tttHelpers::boardIndex.');
    }

    return boardIndex;
};

export { generateIds, idToBoardIndex };