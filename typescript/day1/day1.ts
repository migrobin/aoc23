import { readFile } from "fs";

readFile("data", "utf-8", (err, input: unknown) => {
    if (err || typeof input !== "string") throw err;
    const data = input.split("\n");
    console.log(data);
});

const part1 = (): string => {
    return "part1";
};

const part2 = (): string => {
    return "part2";
};

console.log("Day 1 - Part 1:", part1());
console.log("Day 1 - Part 2:", part2());
