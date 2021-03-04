const { expect } = require('chai');
const { xWinConditions, oWinConditions } = require('./test_files/test_tttStructs');

const simpleTestPatterns = [
        '---------', 'XXX-O--O-', '-XX-XOO--', 'OX--OXXX0'
];

describe('xWinCondtions and oWinConditions:', () => {
    describe('do they pass simple tests?:', () => {
        let pattern: string, xCondition: RegExp, oCondition: RegExp;

        console.log('pattern:', simpleTestPatterns[0]);
        console.log('x condition:', xWinConditions[0]);
        console.log('o condition:', oWinConditions[0]);
        it('first pattern fails first conditon of each:', () => {
            pattern = simpleTestPatterns[0];
            xCondition = xWinConditions[0];
            oCondition = oWinConditions[0];

            console.log('1:');
            console.log('X:', xCondition.test(pattern));
            expect(xCondition.test(pattern)).to.equal(false);
            console.log('O:', oCondition.test(pattern));
            expect(oCondition.test(pattern)).to.equal(false);
        });
        it('second pattern passes first condition of X but not O:', () => {
            pattern = simpleTestPatterns[1];
            xCondition = xWinConditions[0];
            oCondition = oWinConditions[0];

            console.log('2:');
            console.log('X:', xCondition.test(pattern));
            expect(xCondition.test(pattern)).to.equal(true);
            console.log('O:', oCondition.test(pattern));
            expect(oCondition.test(pattern)).to.equal(false);
        });
    });
});