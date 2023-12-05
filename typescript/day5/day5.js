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
        .map((el) => el
        .split("\n")
        .filter((char) => !isNaN(parseInt(char[0])))
        .map((el) => el.split(" ").map((el) => parseInt(el))));
    // console.log(data);
    function mapper(seed, turnIndex) {
        //console.log("seed", seed);
        if (turnIndex === data.length)
            return seed;
        for (let i = 0; i < data[turnIndex].length; i++) {
            //  console.log("line", data[turnIndex][i]);
            if (seed < data[turnIndex][i][1])
                continue;
            if (seed >= data[turnIndex][i][1] && seed <= data[turnIndex][i][1] + data[turnIndex][i][2])
                return mapper(data[turnIndex][i][0] - data[turnIndex][i][1] + seed, turnIndex + 1);
        }
        return mapper(seed, turnIndex + 1);
    }
    const result = seeds.map((seed) => mapper(seed, 0)).sort((a, b) => a - b);
    return result[0].toString();
};
const part2 = () => {
    return "part2";
};
console.log("Day 1 - Part 1:", part1());
console.log("Day 1 - Part 2:", part2());
