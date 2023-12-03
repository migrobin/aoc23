import { readFileSync } from "fs";

const input: string[] = readFileSync("data1", "utf-8").split("\n");

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
    return "part2";
};

console.log("Day 1 - Part 1:", part1());
console.log("Day 1 - Part 2:", part2());
