import { readFileSync } from "fs";

const input: string[] = readFileSync("data1", "utf-8").split("\n");

const part1 = (): number => {
    const data = input.map((line) => line.split(" ").map((char) => Number(char)));

    function find(arr: number[]): number[] {
        let factors: number[] = [];
        let newArr: number[] = [];

        while (arr.length > 2 && !(arr[arr.length - 1] === 0 && arr[arr.length - 2] === 0)) {
            factors.push(arr[arr.length - 1] - arr[arr.length - 2]);

            for (let i = 1; i < arr.length; i++) {
                newArr.push(arr[i] - arr[i - 1]);
            }
            arr = [...newArr];
        }
        return factors;
    }

    const nextNumber: number[] = [];

    data.forEach((line, index) => {
        const factors = find(line);
        console.log(index, line[line.length - 1] + factors.reduce((a, b) => a + b, 0));
        nextNumber.push(line[line.length - 1] + factors.reduce((a, b) => a + b, 0));
    });

    return nextNumber.reduce((a, b) => a + b, 0);
};

const part2 = (): number => {
    const data = input.map((line) => line.split(" ").map((char) => Number(char)));

    function find(arr: number[]): number[] {
        let factors: number[] = [];
        let newArr: number[] = [];

        while (arr.length > 2 && !(arr[arr.length - 1] === 0 && arr[arr.length - 2] === 0)) {
            factors.push(arr[arr.length - 1] - arr[arr.length - 2]);

            for (let i = 1; i < arr.length; i++) {
                newArr.push(arr[i] - arr[i - 1]);
            }
            arr = [...newArr];
        }
        return factors;
    }

    const nextNumber: number[] = [];

    data.forEach((line, index) => {
        const factors = find(line);
        //    console.log(index, line[line.length - 1] + factors.reduce((a, b) => a + b, 0));
        nextNumber.push(line[line.length - 1] + factors.reduce((a, b) => a + b, 0));
    });

    return nextNumber.reduce((a, b) => a + b, 0);
};

//console.log("Day 1 - Part 1:", part1());

console.time();
console.log("Day 1 - Part 2:", part2());
console.timeEnd();
