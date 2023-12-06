import { readFileSync } from "fs";

const input: number[][] = readFileSync("data1", "utf-8")
    .split("\n")
    .map((line) =>
        line
            .split(":")
            .filter((_, index) => index % 2 === 1)
            .map((chars) =>
                chars
                    .trim()
                    .split(" ")
                    .filter((el) => el !== "")
                    .map((char) => parseInt(char))
            )
    )
    .flat();

function transpose(matrix: number[][]): number[][] {
    const transposed: number[][] = [[]];

    for (let col = 0; col < matrix[0].length - 1; col++) {
        transposed.push([]);
    }

    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[0].length; col++) {
            transposed[col].push(matrix[row][col]);
        }
    }
    return transposed;
}
const part1 = (): string => {
    function racesWon(race: number[]): number {
        let [time, record] = race;

        let distance = 0;
        let count = 0;
        for (let pressed = 0; pressed <= record; pressed++) {
            distance = (time - pressed) * pressed;
            if (distance > record) count++;
        }
        return count;
    }

    const data = transpose(input);
    console.log(data);

    return data.reduce((acc, next) => (acc *= racesWon(next)), 1).toString();
};

const part2 = (): string => {
    return "part2";
};

console.log("Day 1 - Part 1:", part1());
console.log("Day 1 - Part 2:", part2());
