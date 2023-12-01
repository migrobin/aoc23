"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const input = (0, fs_1.readFileSync)("data", "utf-8");
const data = input.split("\n");
console.log(data);
const part1 = () => {
    for (let line of data) {
        console.log(line);
    }
    return "part1";
};
const part2 = () => {
    return "part2";
};
console.log("Day 1 - Part 1:", part1());
console.log("Day 1 - Part 2:", part2());
