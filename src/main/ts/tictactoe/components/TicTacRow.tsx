import React from 'react';

import TicTacCol from './TicTacCol';

type TicTacRowProps = {
    idRow: string[],
    currentTurn: 'X' | 'O'
    changeTurn: (string) => void
};

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