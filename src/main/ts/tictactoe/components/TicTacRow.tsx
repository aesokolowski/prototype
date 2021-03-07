import React from 'react';

import TicTacCol from './TicTacCol';

type TicTacRowProps = {
    idRow: string[],
    board: string,
    currentTurn: 'X' | 'O',
    changeTurn: (string) => void,
    isLocked: () => boolean
};

//  This component is functional because it's merely mapping the table row
//  to columns and fowarding its props to the actual cells
const TicTacRow: React.FunctionComponent<TicTacRowProps> =
        ({ children, idRow, board, currentTurn, changeTurn, isLocked }) => (
    <tr>{
        idRow.map((id, idx) => (
            <TicTacCol key={idx}
                id={id}
                board={board}
                currentTurn={currentTurn}
                changeTurn={changeTurn}
                isLocked={isLocked}
            />
        ))
    }</tr>
);

export default TicTacRow;