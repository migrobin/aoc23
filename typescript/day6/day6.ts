import { readFileSync } from "fs";

//Time:      7  15   30
//Distance:  9  40  200

function transpose(matrix: number[][]): number[][] {
    const transposed: number[][] = [[]];

    for (let row = 0; row < matrix.length; row++) {
        transposed.push([]);
    }

    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[0].length; col++) {
            transposed[col].push(matrix[row][col]);
        }
    }
    return transposed;
}

const input: number[][] = readFileSync("data", "utf-8")
    .split("\n")
    .map((line) =>
        line
            .split(":")
            .filter((_, index) => index % 2 === 1)
            .map((chars) =>
                chars
                    .trim()
                    .split(" ")
                    .filter((el) => el !== "")
                    .map((char) => parseInt(char))
            )
    )
    .flat();

console.log(input);
console.log(transpose(input));

const part1 = (): string => {
    for (let line of input) {
        //        console.log(line);
    }
    return "part1";
};

const part2 = (): string => {
    return "part2";
};

console.log("Day 1 - Part 1:", part1());
console.log("Day 1 - Part 2:", part2());
