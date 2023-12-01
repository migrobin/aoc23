import { readFileSync } from "fs";

const input: string = readFileSync("data", "utf-8");
const data = input.split("\n");
console.log(data);

const part1 = (): string => {
    for (let line of data) {
        console.log(line);
    }
    return "part1";
};

const part2 = (): string => {
    return "part2";
};

console.log("Day 1 - Part 1:", part1());
console.log("Day 1 - Part 2:", part2());