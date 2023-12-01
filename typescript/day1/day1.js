"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const input = (0, fs_1.readFileSync)("data1", "utf-8");
const data = input.split("\n");
console.log(data);
const part1 = () => {
    let solutions = [];
    let first = undefined;
    let last = undefined;
    let char = "";
    for (const line of data) {
        for (char of line) {
            if (char >= "0" && char <= "9") {
                if (first === undefined)
                    first = parseInt(char);
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
const part2 = () => {
    return "part2";
};
console.log("Day 1 - Part 1:", part1());
console.log("Day 1 - Part 2:", part2());
