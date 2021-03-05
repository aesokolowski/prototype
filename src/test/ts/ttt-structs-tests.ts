const { expect } = require('chai');
const { xWinConditions, oWinConditions } = require('./test_files/test_tttStructs');

const simpleTestPatterns = [
        '---------', 'XXX-O--O-', '-XX-XOO--', 'OX--OXXXO'
];

describe('xWinCondtions and oWinConditions:', () => {
    describe('do they pass simple tests?:', () => {
        const xCondition: RegExp = xWinConditions[0];
        const oCondition: RegExp = oWinConditions[0];

        console.log('condition 1 (X or O):');
        console.log('X|X|X');
        console.log('-----');
        console.log(' | | ');
        console.log('-----');
        console.log(' | | ');

        it('first pattern fails first conditon of each:', () => {
            const pattern = simpleTestPatterns[0];

            expect(xCondition.test(pattern)).to.equal(false);
            expect(oCondition.test(pattern)).to.equal(false);
        });
        it('second pattern passes first condition of X but not O:', () => {
            const pattern = simpleTestPatterns[1];

            expect(xCondition.test(pattern)).to.equal(true);
            expect(oCondition.test(pattern)).to.equal(false);
        });
        it('third pattern fails both conditions:', () => {
            const pattern = simpleTestPatterns[2];

            expect(xCondition.test(pattern)).to.equal(false);
            expect(oCondition.test(pattern)).to.equal(false);
        });
    });

    describe('new condition:', () => {
        const xCondition: RegExp = xWinConditions[6];
        const oCondition: RegExp = oWinConditions[6];

        console.log('condition 2:');
        console.log('X| | ');
        console.log('-----');
        console.log(' |X| ');
        console.log('-----');
        console.log(' | |X');

        it('fourth pattern passes O but not X:', () => {
            const pattern = simpleTestPatterns[3];

            expect(xCondition.test(pattern)).to.equal(false);
            expect(oCondition.test(pattern)).to.equal(true);
        });
    });

    describe('all conditions against series of patterns:', () => {
        const patterns = [ // comments note which condititon pair should get
                           // satisfied
            // condition 0            // condition 3
            'XXX-OO---', 'OOOXX-X--', 'XO-X--XO-', 'OXXOX-O--',
            // condition 1            // condition 2
            '-O-XXXO--', 'XXOOOOX-X', 'OOXXOOXXX', 'OXXXX-OOO'
        ];

        console.log('patterns:', patterns);
    });
});