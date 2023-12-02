"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const part1 = () => {
    const input = (0, fs_1.readFileSync)("data1", "utf-8");
    const data = input.split("\n");
    //console.log(data);
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
    // console.log(solutions);
    return solutions.reduce((a, b) => a + b, 0).toString();
};
const part2 = () => {
    const input = (0, fs_1.readFileSync)("data2", "utf-8");
    const data = input.split("\n");
    // console.log(data);
    let solutions = [];
    let first;
    let last;
    const digits = [
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
    ];
    for (const line of data) {
        first = last = 0;
        for (let i = 0; i < line.length; i++) {
            if (Number(line[i])) {
                first = parseInt(line[i]);
            }
            else {
                digits.forEach((digit, index) => {
                    if (line.startsWith(digit, i)) {
                        first = index + 1;
                    }
                });
            }
            if (first !== 0)
                break;
        }
        for (let i = line.length - 1; i >= 0; i--) {
            if (Number(line[i])) {
                last = parseInt(line[i]);
            }
            else {
                digits.forEach((digit, index) => {
                    if (line.startsWith(digit, i)) {
                        last = index + 1;
                    }
                });
            }
            if (last !== 0)
                break;
        }
        solutions.push(parseInt(first.toString() + last.toString()));
    }
    // console.log(solutions);
    return solutions.reduce((a, b) => a + b, 0).toString();
};
console.log("Day 1 - Part 1:", part1());
console.log("Day 1 - Part 2:", part2());
