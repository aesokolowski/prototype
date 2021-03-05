const { expect } = require('chai');
const chai = require('chai');
const assertType = require('chai-asserttype');
const { xWinConditions, oWinConditions } = require('./test_files/test_tttStructs');

const simpleTestPatterns = [
        '---------', 'XXX-O--O-', '-XX-XOO--', 'OX--OXXXO'
];

chai.use(assertType);

describe('xWinCondtions and oWinConditions:', () => {
    describe('do they pass simple tests?:', () => {
        const xCondition: RegExp = xWinConditions[0];
        const oCondition: RegExp = oWinConditions[0];

        console.log('simpleTestPattern:', simpleTestPatterns);
        console.log('condition 1 (X or O):');
        console.log('X|X|X');
        console.log('-----');
        console.log(' | | ');
        console.log('-----');
        console.log(' | | ');

        it('first pattern fails first conditon of each', () => {
            const pattern = simpleTestPatterns[0];

            expect(xCondition.test(pattern)).to.equal(false);
            expect(oCondition.test(pattern)).to.equal(false);
        });
        it('second pattern passes first condition of X but not O', () => {
            const pattern = simpleTestPatterns[1];

            expect(xCondition.test(pattern)).to.equal(true);
            expect(oCondition.test(pattern)).to.equal(false);
        });
        it('third pattern fails both conditions', () => {
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

        it('fourth pattern passes O but not X', () => {
            const pattern = simpleTestPatterns[3];

            expect(xCondition.test(pattern)).to.equal(false);
            expect(oCondition.test(pattern)).to.equal(true);
        });
    });

    describe('all conditions against series of patterns', () => {
        const patterns = [ // comments note which condititon pair should get
                           // satisfied
            // condition 0            // condition 3
            'XXX-OO---', 'OOOXX-X--', 'XO-X--XO-', 'OXXOX-O--',
            // condition 1            // condition 2
            '-O-XXXO--', 'XXOOOOX-X', 'OOXXOOXXX', 'OXXXX-OOO',
            // condition 4            // condition 5
            'OX-OXX-XO', 'XO--OX-OX', 'O-X-OX--X', 'XXO-XO--O',
            // condition 6            // condition 7
            'XOO-X---X', 'O--XOXX-O', 'XOXOX-X-O', '-XOXO-OX-'
        ];

        console.log('patterns:', patterns);
        it ('ensure both condition arrays are Arrays and of the same length',
                () => {
            expect(xWinConditions).to.be.an.array();
            expect(xWinConditions.length).to.equal(oWinConditions.length);
        });
        it ('ensure individually that both condition arrays are of length 8',
                () => {
            expect(xWinConditions.length).to.equal(8);
            expect(oWinConditions.length).to.equal(8);
        });
        it('first 8 patterns', () => {
            for (let i = 0; i < xWinConditions.length; i++) {
                const xCondition: RegExp = xWinConditions[i];
                const oCondition: RegExp = oWinConditions[i];

                for (let j = 0; j < 8; j++) {
                    const pattern = patterns[j];
                    const xResult = xCondition.test(pattern);
                    const oResult = oCondition.test(pattern);

                    // assume false, just code the branches with a true
                    if (
                       (i === 0 && j === 0) || (i === 1 && j === 4) ||
                       (i === 2 && j === 6) || (i === 3 && j === 2)
                    ) {
                        expect(xResult).to.equal(true);
                        expect(oResult).to.equal(false);
                    } else if (
                        (i === 0 && j === 1) || (i === 1 && j === 5) ||
                        (i === 2 && j === 7) || (i === 3 && j === 3)
                    ) {
                        expect(xResult).to.equal(false);
                        expect(oResult).to.equal(true);
                    } else {
                        expect(xResult).to.equal(false);
                        expect(oResult).to.equal(false);
                    }
                }
            }
        });
        it('last set of 8 patterns:', () => {
            for (let i = 0; i < xWinConditions.length; i++) {
                const xCondition: RegExp = xWinConditions[i];
                const oCondition: RegExp = oWinConditions[i];

                for (let j = 8; j < 16; j++) {
                    const pattern = patterns[j];
                    const xResult = xCondition.test(pattern);
                    const oResult = oCondition.test(pattern);

                    if (
                        (i === 4 && j === 8) || (i === 5 && j === 10) ||
                        (i === 6 && j === 12) || (i === 7 && j === 14) 
                    ) { 
                        expect(xResult).to.equal(true);
                        expect(oResult).to.equal(false);
                    } else if (
                        (i === 4 && j === 9) || (i === 5 && j === 11) ||
                        (i === 6 && j === 13) || (i === 7 && j === 15)
                    ) {
                        expect(xResult).to.equal(false);
                        expect(oResult).to.equal(true);
                    } else {
                        expect(xResult).to.equal(false);
                        expect(oResult).to.equal(false);
                    }
                }
            }
        });
    });
});