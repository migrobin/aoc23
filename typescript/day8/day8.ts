import { log } from "console";
import { readFileSync } from "fs";

const input: string[] = readFileSync("data1", "utf-8").split("\n");

const part1 = (): number => {
    const moves = input[0].split("");

    const hashMap = {};
    input
        .filter((_, index) => index > 1)
        .forEach((line, index) => {
            hashMap[line.split("=")[0].trim()] = [
                line.split("=")[1].trim().replace(/[()]/g, "").split(",")[0],
                line.split("=")[1].replace(/[()]/g, "").split(",")[1].trim(),
            ];
        });

    let found = false;
    let node = "AAA";
    let moveLoop = 0;
    let count = 0;

    while (!found) {
        node = moves[moveLoop] === "L" ? hashMap[node][0] : hashMap[node][1];
        if (node === "ZZZ") found = true;

        moveLoop = moveLoop === moves.length - 1 ? 0 : moveLoop + 1;

        count++;
    }
    return count;
};

const part2 = (): string => {
    return "part2";
};
console.time();
console.log("Day 1 - Part 1:", part1());
console.timeEnd();
//console.log("Day 1 - Part 2:", part2());
