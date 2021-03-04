const { expect } = require('chai');
const { xWinConditions, oWinConditions } = require('./test_files/test_tttStructs.ts');

const simpleTestPatterns = [
            '---------', 'XXX-O--O-', '-XX-XOO--', 'OX--OXXX0'
];

describe('xWinCondtions and oWinConditions:', () => {
    describe('do they pass simple tests?:', () => {
        console.log('pattern:', simpleTestPatterns[0]);
        console.log('x condition:', xWinConditions[0]);
        console.log('o condition:', oWinConditions[0]);
        it('first pattern fails first conditon of each:', () => {
            expect(simpleTestPatterns[0].match(xWinConditions[0])).to.equal(null);
            expect(simpleTestPatterns[0].match(oWinConditions[0])).to.equal(null);
        });
        it('second pattern passes first condition of each:', () => {
            expect(simpleTestPatterns[1].match(xWinConditions[0])[0]).to.equal(simpleTestPatterns[1]);
            expect(simpleTestPatterns[1].match(oWinConditions[0])[0]).to.equal(simpleTestPatterns[1]);
        });
    });
});