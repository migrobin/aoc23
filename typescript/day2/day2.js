"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const input = (0, fs_1.readFileSync)("data1", "utf-8");
const data = input.split("\n").map((line) => line.split(":"));
const result = [];
const part1 = () => {
    const maxColor = new Map([
        ["red", 12],
        ["green", 13],
        ["blue", 14],
    ]);
    const games = data.map((line) => line.map((element) => element
        .split(";")
        .map((element) => element.split(",").map((element) => element.trim()))));
    let busted;
    games.forEach((game) => {
        busted = false;
        console.log("game", game[0][0][0].replace("Game ", ""));
        game[1].forEach((gameSet) => {
            // console.log("gameSet", gameSet);
            gameSet.forEach((draw) => {
                let drawArr = draw.split(" ");
                maxColor.forEach((value, key) => {
                    if (key === drawArr[1] && maxColor.get(key)) {
                        if (Number(maxColor.get(key)) < Number(drawArr[0])) {
                            console.log("busted  Game", game[0][0][0].replace("Game ", ""), maxColor.get(key), "<", drawArr[0]);
                            busted = true;
                        }
                    }
                });
            });
        });
        if (!busted) {
            result.push(Number(game[0][0][0].replace("Game ", "")));
        }
    });
    return result.reduce((a, b) => a + b, 0).toString();
};
const part2 = () => {
    const maxColor = new Map();
    let power;
    const games = data.map((line) => line.map((element) => element
        .split(";")
        .map((element) => element.split(",").map((element) => element.trim()))));
    games.forEach((game) => {
        maxColor.set("red", 0);
        maxColor.set("green", 0);
        maxColor.set("blue", 0);
        power = 1;
        console.log("game", game[0][0][0].replace("Game ", ""));
        game[1].forEach((gameSet) => {
            gameSet.forEach((draw) => {
                let drawArr = draw.split(" ");
                maxColor.forEach((value, key) => {
                    if (key === drawArr[1]) {
                        if (Number(drawArr[0]) > value) {
                            maxColor.set(key, Number(drawArr[0]));
                        }
                    }
                });
            });
        });
        console.log("game ", game[0][0][0].replace("Game ", ""), maxColor);
        maxColor.forEach((value, key) => {
            power *= value;
        });
        console.log("power", power);
        result.push(power);
    });
    return result.reduce((a, b) => a + b, 0).toString();
};
//console.log("Day 1 - Part 1:", part1());
console.log("Day 1 - Part 2:", part2());
