import { readFileSync } from "fs";

const input: string[] = readFileSync("data", "utf-8").split("\n");

const part1 = (): number => {

        console.log(input)
    return "part1";
};

const part2 = (): number => {
    return 1;
};

console.log("Day 1 - Part 1:", part1());
console.log("Day 1 - Part 2:", part2());
