"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
(0, fs_1.readFile)("data", "utf-8", (err, input) => {
    if (err || typeof input !== "string")
        throw err;
    const data = input.split("\n");
    console.log(data);
});
const part1 = () => {
    return "part1";
};
const part2 = () => {
    return "part2";
};
console.log("Day 1 - Part 1:", part1());
console.log("Day 1 - Part 2:", part2());
