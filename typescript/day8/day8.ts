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

const part2 = (): number => {
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
    let node = {};
    let moveLoop = 0;
    let count = 0;

    let currentArr = Object.keys(hashMap)
        .filter((item) => item[2] === "A")
        .map((el, index) => {
            if (index === 0) node = { [el]: hashMap[el] };
            return { [el]: hashMap[el] };
        });

    console.log(currentArr);

    let old: { [index: number]: number[] } = {};
    while (!found) {
        currentArr = currentArr.map((currentNode) => {
            return (currentNode =
                moves[moveLoop] === "L"
                    ? { [Object.values(currentNode).flat()[0]]: hashMap[Object.values(currentNode).flat()[0]] }
                    : { [Object.values(currentNode).flat()[1]]: hashMap[Object.values(currentNode).flat()[1]] });
        });

        found = true;
        currentArr.forEach((el, index) => {
            if (Object.keys(el)[0][2] !== "Z") {
                found = false;
            } else {
                console.log(count);
                if (!old[index]) old[index] = [];
                old[index].push(count);
            }
            if (count === 50000) found = true;
        });
        console.log(old);

        moveLoop = moveLoop === moves.length - 1 ? 0 : moveLoop + 1;

        count++;
    }
    const results: number[] = [];

    Object.values(old).forEach((value) => {
        results.push(value[1] - value[0]);
    });
    console.log(results);

    // **** LCM from chatgpt **************

    // Function to calculate the GCD (Greatest Common Divisor)
    function gcd(a: number, b: number): number {
        return b === 0 ? a : gcd(b, a % b);
    }

    // Function to calculate the LCM (Least Common Multiple)
    function lcm(a: number, b: number): number {
        return (a * b) / gcd(a, b);
    }

    // Function to calculate the LCM of an array of numbers
    function calculateLCM(numbers): number {
        if (numbers.length < 2) {
            throw new Error("At least two numbers are required to calculate LCM.");
        }
        let result = numbers[0];
        for (let i = 1; i < numbers.length; i++) {
            result = lcm(result, numbers[i]);
        }

        return result;
    }
    return calculateLCM(results);
};

//console.log("Day 1 - Part 1:", part1());

console.time();
console.log("Day 1 - Part 2:", part2());
console.timeEnd();
