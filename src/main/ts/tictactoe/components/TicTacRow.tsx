import React from 'react';

import { TicTacRowProps } from '../../struct/tttTypes';

import TicTacCol from './TicTacCol';

//  This component is functional because it's merely mapping the table row
//  to columns and fowarding its props to the actual cells
const TicTacRow: React.FunctionComponent<TicTacRowProps> =
        ({ children, idRow, board, computerJustMadeMove, currentTurn, changeTurn, isLocked }) => (
    <tr>{
        idRow.map((id, idx) => <TicTacCol
            key={idx}
            id={id}
            board={board}
            computerJustMadeMove={computerJustMadeMove}
            currentTurn={currentTurn}
            changeTurn={changeTurn}
            isLocked={isLocked}
        />)
    }</tr>
);

export default TicTacRow;