import { log, time } from "console";
import { readFileSync } from "fs";

const input: string[] = readFileSync("data1", "utf-8").split("\n");

const part1 = (): string => {
    const data = input.map((line) => line.split(":")[1]);
    console.log(data);
    let drawnNumbers: Array<string[]> = [];
    let cardNumbers: Array<string[]> = [];

    for (let line of data) {
        drawnNumbers.push(
            line
                .split("|")[0]
                .split(" ")
                .filter((el) => el.trim() !== "")
        );

        cardNumbers.push(
            line
                .split("|")[1]
                .split(" ")
                .filter((el) => el.trim() !== "")
        );
    }

    console.table(drawnNumbers);
    console.table(cardNumbers);
    let winning = 0;
    let score = 0;
    for (let row = 0; row < cardNumbers.length; row++) {
        winning = 0;
        for (let col = 0; col < cardNumbers[0].length; col++) {
            if (drawnNumbers[row].includes(cardNumbers[row][col])) winning++;
        }
        if (winning > 0) score += 2 ** (winning - 1);
        console.log("wins", winning);
        console.log("score", score);
    }

    return score.toString();
};

const part2 = (): string => {
    const data = input.map((line) => line.split(":")[1]);
    //  console.log(data);

    let drawnNumbers: Array<{ game: number; values: Array<string> }> = [];
    let cardNumbers: Array<{ game: number; values: Array<string> }> = [];

    for (let line = 0; line < data.length; line++) {
        drawnNumbers.push({
            game: line + 1,
            values: data[line]
                .split("|")[0]
                .split(" ")
                .filter((el) => el.trim() !== ""),
        });

        cardNumbers.push({
            game: line + 1,
            values: data[line]
                .split("|")[1]
                .split(" ")
                .filter((el) => el.trim() !== ""),
        });
    }

    // console.table(drawnNumbers);
    // console.table(cardNumbers);
    let wins = 0;

    let gameCount = new Map();
    cardNumbers.forEach((cardObj) => gameCount.set(cardObj.game, 1));
    // console.log(gameCount);

    // ---------------------------------------------------------

    cardNumbers.forEach((line, index) => {
        wins = 0;

        for (let col = 0; col < cardNumbers[0].values.length; col++) {
            if (drawnNumbers[index].values.includes(cardNumbers[index].values[col])) wins++;
        }

        for (let i = index + 2; i < index + 2 + wins; i++) {
            gameCount.set(i, gameCount.get(i) + gameCount.get(index + 1));
        }
    });

    console.log(gameCount);
    let total = 0;
    gameCount.forEach((value) => {
        total += value;
    });

    return total.toString();
};

//console.log("Day 1 - Part 1:", part1());
console.time();
console.log("Day 1 - Part 2:", part2());
console.timeEnd();
