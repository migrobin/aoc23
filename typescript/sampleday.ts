import { readFileSync } from "fs";

const input: string[] = readFileSync("data", "utf-8").split("\n");

const part1 = (): string => {
    for (let line of input) {
        console.log(line);
    }
    return "part1";
};

const part2 = (): string => {
    return "part2";
};

console.log("Day 1 - Part 1:", part1());
console.log("Day 1 - Part 2:", part2());
