// winning conditions for X
const xWinConditions = [
    // across
    /^XXX[OX-]{6}$/,
    /^[OX-]{3}XXX[OX-]{3}{$/,
    /^[OX-]{6}XXX$/,
    // vertical
    /^X[OX-]{3}X[OX-]{3}X[OX-]{3}$/,
    /^[OX-]X[OX-]{2}X\[OX-]{2}X[OX-]$/,
    /^[OX-]{2}X[OX-]{2}X[OX-]{2}X$/,
    // diagonal
    /^X[OX-]{3}X[OX-]{3}X$/,
    /^[OX-]{2}X[OX-]X[OX-]X[OX-]{2}$/
];

const oWinConditions = [
    /^OOO[OX-]{6}$/,
    /^[OX-]{3}OOO[OX-]{3}$/,
    /^[OX-]{6}OOO$/,
    /^O[OX-]{2}O[OX-]{2}O[OX-]{2}$/,
    /^[OX-]O[OX-]{2}O[OX-]{2}O\[OX-\]$/,
    /^[OX-]{2}O[OX-]{2}O[OX-]{2}O$/,
    /^O[OX-]{3}O[OX-]{3}O$/,
    /^[OX-]{2}O[OX-]O[OX-]O[OX-]{2}$/
];

export { xWinConditions, oWinConditions };