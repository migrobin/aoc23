import { readFileSync } from "fs";

const input: string[] = readFileSync("data", "utf-8").split("\n");

type obj = { char: string; mark: position };
type position = { row: number; col: number };

function transpose(matrix: obj[][]): obj[][] {
    const transposed: obj[][] = [[]];

    for (let col = 0; col < matrix[0].length - 1; col++) {
        transposed.push([]);
    }

    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[0].length; col++) {
            transposed[col].push(matrix[row][col]);
        }
    }
    return transposed;
}

const part1 = (): number => {
    const galaxies: position[] = [];
    const data: obj[][] = input.map((line, i) =>
        line.split("").map((el, j) => {
            if (el === "#") galaxies.push({ row: i, col: j });
            return {
                char: el,
                mark: { row: 1, col: 1 },
            };
        })
    );
    let galaxyInRow: number[] = [];
    let galaxyInCol: number[] = [];

    function distance(g1: position, g2: position): number {
        let current: position | undefined = g1;
        let queue: position[] | undefined = [];
        let count = 1;

        queue.push(current);
        let counted = false;
        while (current?.row !== g2.row && current?.col !== g2.col) {
            current = queue.pop();
            counted = false;

            if (current) {
                if (current.row > 0) {
                    queue.push({ row: current.row - 1, col: current.col });
                    if (data[current.row][current.row].mark.col === 2) {
                        count++;
                        counted = true;
                    }
                }

                if (current.row < data.length) {
                    queue.push({ row: current.row + 1, col: current.col });
                    if (data[current.row][current.row].mark.col === 2 && counted === false) count++;
                }

                if (current.col > 0) {
                    queue.push({ row: current.row, col: current.col - 1 });
                    if (data[current.row][current.row].mark.row === 2) {
                        count++;
                        counted = true;
                    }
                }
                if (current.col < data[0].length) {
                    if (data[current.row][current.row].mark.row === 2 && counted === false) count++;
                    queue.push({ row: current.row, col: current.col + 1 });
                }
                count++;
            }
        }

        return count;
    }

    data.forEach((line, index) => {
        if (line.map((el) => el.char).includes("#")) galaxyInRow.push(index);
    });

    transpose(data).forEach((line, index) => {
        if (line.map((el) => el.char).includes("#")) galaxyInCol.push(index);
    });

    data.forEach((_, rowIndex) => {
        data.forEach((_, colIndex) => {
            if (!galaxyInRow.includes(rowIndex)) data[rowIndex][colIndex].mark.row = 2;
            if (!galaxyInCol.includes(colIndex)) data[rowIndex][colIndex].mark.col = 2;
        });
    });

    console.table(data.map((line) => line.map((el) => el.char)));
    console.log(galaxies);
    console.log(distance(galaxies[0], galaxies[6]));

    return 1;
};

const part2 = (): number => {
    return 1;
};

console.log("Day 1 - Part 1:", part1());
console.log("Day 1 - Part 2:", part2());
