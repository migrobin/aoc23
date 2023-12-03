import { readFileSync } from "fs";

const input: string[] = readFileSync("data", "utf-8").split("\n");

function isNumber(x: number): boolean {
    return !isNaN(x);
}

const part1 = (): string => {
    const data = input.map((line) => line.split(""));

    const toCheck = (row: number, col: number) => {
        let arrToCheck = [];

        if (row > 0) {
            arrToCheck.push([row - 1, col]);

            if (col > 0) {
                arrToCheck.push([row - 1, col - 1]);
                arrToCheck.push([row, col - 1]);
            }

            if (col < data[0].length - 1) {
                arrToCheck.push([row - 1, col + 1]);
                arrToCheck.push([row, col + 1]);
            }
        }
        if (row < data[0].length - 1) {
            arrToCheck.push([row + 1, col]);

            if (col > 0) {
                arrToCheck.push([row, col - 1]);
                arrToCheck.push([row + 1, col - 1]);
            }
            if (col < data[0].length - 1) {
                arrToCheck.push([row, col + 1]);
                arrToCheck.push([row + 1, col + 1]);
            }
        }

        console.log("row", row, "col", col);
        // console.table(arrToCheck);
        return arrToCheck;
    };

    function hasSymbol(row: number, col: number): boolean {
        const symbols = [
            "!",
            '"',
            "#",
            "$",
            "%",
            "&",
            "'",
            "(",
            ")",
            "*",
            "+",
            ",",
            "-",
            "/",
            ":",
            ";",
            "<",
            "=",
            ">",
            "?",
            "@",
            "[",
            "\\",
            "]",
            "^",
            "_",
            "`",
            "{",
            "|",
            "}",
            "~",
        ];

        let hasSymbol = false;

        toCheck(row, col).forEach((position) => {
            if (symbols.includes(data[position[0]][position[1]]))
                hasSymbol = true;
        });
        console.log(hasSymbol);
        return hasSymbol;
    }

    console.table(data);

    const result: number[] = [];
    let temp = "";

    let valid = false;
    for (let row = 0; row < data.length; row++) {
        for (let col = 0; col < data[0].length; col++) {
            if (isNumber(+data[row][col])) {
                temp += data[row][col];
                if (hasSymbol(row, col)) valid = true;
            } else {
                if (valid === true) {
                    result.push(Number(temp));
                    console.log("result", result);
                    valid = false;
                }
                temp = "";
            }
        }
    }
    return result.reduce((a, b) => a + b).toString();
};

const part2 = (): string => {
    const data = input.map((line) => line.split(""));

    const toCheck = (row: number, col: number) => {
        let arrToCheck = [];

        if (row > 0) {
            arrToCheck.push([row - 1, col]);

            if (col > 0) {
                arrToCheck.push([row - 1, col - 1]);
                arrToCheck.push([row, col - 1]);
            }

            if (col < data[0].length - 1) {
                arrToCheck.push([row - 1, col + 1]);
                arrToCheck.push([row, col + 1]);
            }
        }
        if (row < data[0].length - 1) {
            arrToCheck.push([row + 1, col]);

            if (col > 0) {
                arrToCheck.push([row, col - 1]);
                arrToCheck.push([row + 1, col - 1]);
            }
            if (col < data[0].length - 1) {
                arrToCheck.push([row, col + 1]);
                arrToCheck.push([row + 1, col + 1]);
            }
        }

        console.log("row", row, "col", col);
        // console.table(arrToCheck);
        return arrToCheck;
    };

    function has2Hits(row: number, col: number): number {
        let num1 = 1;
        let num2 = 1;
        let hits = 0;
        const hitsArray: number[] = [];

        toCheck(row, col).forEach((position) => {
            if (isNumber(+data[position[0]][position[1]]))
                hitsArray.push(arrMap.get([row, col]));
        });
        console.log(hitsArray);
        return num1 * num2;
    }

    console.table(data);

    const result: number[] = [];
    let temp = "";
    const arrMap = new Map();
    let start = -1;

    const stars = [];
    let id = 0;
    for (let row = 0; row < data.length; row++) {
        for (let col = 0; col < data[0].length; col++) {
            if (data[row][col] === "*") stars.push([row, col]);

            if (isNumber(+data[row][col])) {
                if (start === -1) start = col;
                temp += data[row][col];
            } else {
                if (temp !== "") {
                    for (let i = start; i < col; i++) {
                        arrMap.set([row, col], {
                            id: id,
                            row: row,
                            start: start,
                            end: col - 1,
                        });
                    }
                    result.push(Number(temp));
                    id++;
                    start = -1;
                }
                temp = "";
            }
        }
    }
    console.log(arrMap);
    console.log("stars", stars);
    console.log("result", result);

    for (let star of stars) {
        console.log(has2Hits(star[0], star[1]));
    }
    return result.reduce((a, b) => a + b).toString();
};

//console.log("Day 1 - Part 1:", part1());
console.log("Day 1 - Part 2:", part2());
