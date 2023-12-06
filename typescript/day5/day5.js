import { readFileSync } from "fs";
const input = readFileSync("data1", "utf-8").split("\n\n");
const part1 = () => {
    const seeds = input[0]
        .split(":")[1]
        .split(" ")
        .filter((el) => el !== "")
        .map((char) => parseInt(char));
    const data = input
        .filter((_, index) => index > 0)
        .map((x) => x
        .split("\n")
        .filter((char) => !isNaN(parseInt(char[0])))
        .map((el) => el.split(" ").map((el) => parseInt(el))));
    function mapper(seed, turnIndex) {
        if (turnIndex === data.length)
            return seed;
        for (let i = 0; i < data[turnIndex].length; i++) {
            if (seed < data[turnIndex][i][1])
                continue;
            if (seed >= data[turnIndex][i][1] && seed <= data[turnIndex][i][1] + data[turnIndex][i][2])
                return mapper(data[turnIndex][i][0] - data[turnIndex][i][1] + seed, turnIndex + 1);
        }
        return mapper(seed, turnIndex + 1);
    }
    console.log("mapper", mapper(82, 0));
    return seeds
        .map((seed) => mapper(seed, 0))
        .sort((a, b) => a - b)[0]
        .toString();
};
const part2 = () => {
    const seeds = input[0]
        .split(":")[1]
        .split(" ")
        .filter((el) => el !== "")
        .map((char) => parseInt(char));
    const data = input
        .filter((_, index) => index > 0)
        .map((x) => x
        .split("\n")
        .filter((char) => !isNaN(parseInt(char[0])))
        .map((el) => el.split(" ").map((el) => parseInt(el))));
    let seenSeed = {};
    let rec = 0;
    function mapper(seed, turnIndex) {
        if (turnIndex === data.length)
            return seed;
        for (let i = 0; i < data[turnIndex].length; i++) {
            if (seed < data[turnIndex][i][1])
                continue;
            if (seed >= data[turnIndex][i][1] && seed <= data[turnIndex][i][1] + data[turnIndex][i][2]) {
                return mapper(data[turnIndex][i][0] - data[turnIndex][i][1] + seed, turnIndex + 1);
            }
        }
        return mapper(seed, turnIndex + 1);
    }
    let min = Infinity;
    let temp = 0;
    let count = 0;
    // console.log(seeds); [ 79, 14, 55, 13 ]
    //seeds
    seeds.forEach((seed, index) => {
        if (index % 2 === 0) {
            for (let i = 0; i < seeds[index + 1]; i++) {
                count++;
                // seenSeed[JSON.stringify([seed + i - 1, 0])] = temp;
                temp = mapper(seed + i - 1, 0);
                if (temp < min)
                    min = temp;
            }
        }
    });
    //  console.log("mapper 82", mapper(82, 0));
    // console.log(seenSeed);
    console.log("seeds", count);
    return min.toString();
};
//console.log("Day 1 - Part 1:", part1());
//old score 57451710
console.time("time");
console.log("Day 1 - Part 2:", part2());
console.timeEnd("time");
