import { readFileSync } from "fs";

const input: string = readFileSync("data1", "utf-8");
const data = input.split("\n");
console.log(data);

const part1 = (): string => {
    let solutions: number[] = [];
    let first: number | undefined = undefined;
    let last: number | undefined = undefined;
    let char = "";

    for (const line of data) {
        for (char of line) {
            if (char >= "0" && char <= "9") {
                if (first === undefined) first = parseInt(char);
                last = parseInt(char);
            }
        }
        if (typeof first === "number" && typeof last === "number") {
            solutions.push(parseInt(first.toString() + last.toString()));
            first = undefined;
        }
    }
    console.log(solutions);
    return solutions.reduce((a, b) => a + b, 0).toString();
};

const part2 = (): string => {
    return "part2";
};

console.log("Day 1 - Part 1:", part1());
console.log("Day 1 - Part 2:", part2());
