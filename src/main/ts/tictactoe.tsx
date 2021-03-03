import React from 'react';
import ReactDOM from 'react-dom';

import TicTacToe from './tictactoe/TicTacToe';

import { generateIds } from './code/tttHelpers';

const ids = generateIds();

ReactDOM.render(
    <TicTacToe ids={ids} />,
    document.getElementById('tictactoe')
);