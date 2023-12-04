import { readFileSync } from "fs";
const input = readFileSync("data1", "utf-8").split("\n");
function isNumber(x) {
    return !isNaN(x);
}
const part1 = () => {
    const data = input.map((line) => line.split(""));
    const toCheck = (row, col) => {
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
    function hasSymbol(row, col) {
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
    const result = [];
    let temp = "";
    let valid = false;
    for (let row = 0; row < data.length; row++) {
        for (let col = 0; col < data[0].length; col++) {
            if (isNumber(+data[row][col])) {
                temp += data[row][col];
                if (hasSymbol(row, col))
                    valid = true;
            }
            else {
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
const part2 = () => {
    const data = input.map((line) => line.split(""));
    const toCheck = (row, col) => {
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
        return arrToCheck;
    };
    function has2Hits(row, col) {
        const hitsArray = [];
        toCheck(row, col).forEach((position) => {
            if (isNumber(+data[position[0]][position[1]])) {
                console.log("condition", data[position[0]][position[1]]);
                console.log("pos", position);
                console.log("arrMap", arrMap[JSON.stringify(position)]);
                hitsArray.push(arrMap[JSON.stringify(position)].value);
            }
        });
        console.log("hitsArray ", hitsArray);
        const hitsArraySet = new Set(hitsArray);
        if (hitsArraySet.size === 2) {
            const iter = hitsArraySet.values();
            return iter.next().value * iter.next().value;
        }
        return 0;
    }
    console.table(data[9]);
    const result = [];
    let temp = "";
    const arrMap = {};
    let start = -1;
    const stars = [];
    let id = 0;
    for (let row = 0; row < data.length; row++) {
        for (let col = 0; col < data[0].length; col++) {
            if (data[row][col] === "*")
                stars.push([row, col]);
            if (isNumber(+data[row][col])) {
                if (start === -1)
                    start = col;
                temp += data[row][col];
                // right edge
                if (col === data[0].length - 1) {
                    for (let i = start; i < col; i++) {
                        arrMap[JSON.stringify([row, i])] = {
                            id: id,
                            value: +temp,
                            row: row,
                            start: start,
                            end: col - 1,
                        };
                    }
                    result.push(Number(temp));
                    id++;
                    start = -1;
                }
            }
            else {
                if (temp !== "") {
                    for (let i = start; i < col; i++) {
                        arrMap[JSON.stringify([row, i])] = {
                            id: id,
                            value: +temp,
                            row: row,
                            start: start,
                            end: col - 1,
                        };
                    }
                    result.push(Number(temp));
                    id++;
                    start = -1;
                }
                temp = "";
            }
        }
    }
    //console.log(arrMap);
    //console.log(JSON.stringify([0, 3]));
    console.log("stars", stars);
    console.log(arrMap[JSON.stringify([9, 135])]);
    console.log(arrMap[JSON.stringify([9, 136])]);
    console.log(arrMap[JSON.stringify([9, 137])]);
    console.log(arrMap[JSON.stringify([9, 138])]);
    console.log(arrMap[JSON.stringify([139, 133])]);
    // console.log("result", result);
    let sumHits = 0;
    for (let star of stars) {
        console.log("star ....", star);
        console.log(has2Hits(star[0], star[1]));
        sumHits += has2Hits(star[0], star[1]);
    }
    return sumHits.toString();
};
//console.log("Day 1 - Part 1:", part1());
console.log("Day 1 - Part 2:", part2());
