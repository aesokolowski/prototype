import React from 'react';

import TicTacCol from './TicTacCol';

type TicTacRowProps = {
    idRow: string[],
    currentTurn: 'X' | 'O'
    changeTurn: (string) => void
};

//  This component is functional because it's merely mapping the table row
//  to columns and fowarding its props to the actual cells
const TicTacRow: React.FunctionComponent<TicTacRowProps> =
        ({ children, idRow, currentTurn, changeTurn }) => (
    <tr>{
        idRow.map((id, idx) => (
            <TicTacCol key={idx}
                id={id}
                currentTurn={currentTurn}
                changeTurn={changeTurn}
            />
        ))
    }</tr>
);

export default TicTacRow;