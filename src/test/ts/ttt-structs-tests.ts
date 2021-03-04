const { expect } = require('chai');
const { xWinConditions, oWinConditions } = require('./test_files/test_tttStructs');

const simpleTestPatterns = [
        '---------', 'XXX-O--O-', '-XX-XOO--', 'OX--OXXX0'
];

describe('xWinCondtions and oWinConditions:', () => {
    let pattern: string, xCondition: RegExp, oCondition: RegExp;

    describe('do they pass simple tests?:', () => {
        xCondition = xWinConditions[0];
        oCondition = oWinConditions[0];

        console.log('condition 1 (X or O):');
        console.log('X| | ');
        console.log('-----');
        console.log('X| | ');
        console.log('-----');
        console.log('X| | ');

        it('first pattern fails first conditon of each:', () => {
            pattern = simpleTestPatterns[0];

            expect(xCondition.test(pattern)).to.equal(false);
            expect(oCondition.test(pattern)).to.equal(false);
        });
        it('second pattern passes first condition of X but not O:', () => {
            pattern = simpleTestPatterns[1];

            expect(xCondition.test(pattern)).to.equal(true);
            expect(oCondition.test(pattern)).to.equal(false);
        });
        it('third pattern fails both conditions:', () => {
            pattern = simpleTestPatterns[2];

            expect(xCondition.test(pattern)).to.equal(false);
            expect(oCondition.test(pattern)).to.equal(false);
        });
    });

    describe('new condition:', () => {
        xCondition = xWinConditions[6];
        oCondition = oWinConditions[6];

        console.log('condition 2:');
        console.log('X| | ');
        console.log('-----');
        console.log(' |X| ');
        console.log('-----');
        console.log(' | |X');

        it('fourth pattern passes O but not X:', () => {
            pattern = simpleTestPatterns[3];

            expect(xCondition.test(pattern)).to.equal(false);
            expect(oCondition.test(pattern)).to.equal(true);
        });
    });
});