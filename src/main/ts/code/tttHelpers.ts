const prefix = 'ttt-cell';
const list: string[][] = [[]];

const generateIds = () => {
    for (let i = 0; i < 3; i++) {
        const row = (new Number(i)).toString();
        const rowArray: string[] = [];

        for (let j = 0; j < 3; j++) {
            rowArray.push(prefix + row + (new Number(j)).toString());
        }

        list.push(rowArray);
    }

    return list;
};

export { generateIds };