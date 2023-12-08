import { readFileSync } from "fs";

const input: string[] = readFileSync("data1", "utf-8").split("\n");

const part1 = (): string => {
    type game = [game: string, bid: number];
    type gameHashMapType = { [type: string]: game[] };

    const hashMap: gameHashMapType = {
        five: [],
        four: [],
        full: [],
        three: [],
        "2pair": [],
        "1pair": [],
        high: [],
    };

    function findUniques(game: string): number {
        type uniqueType = { [char: string]: number };
        const unique: uniqueType = {};

        game.split("").forEach((char) => {
            if (!unique[char]) {
                unique[char] = 1;
            } else {
                unique[char] += 1;
            }
        });

        let count = 0;
        for (let key in unique) {
            if (unique[key] === 1) count++;
        }

        return count;
    }

    function processGame(game: game) {
        const temp = findUniques(game[0]);
        const tempSet = new Set(game[0]);

        // console.log(temp);
        //         uniques    set
        //five   55555 =>0     1
        //four   34444 =>1     2
        //full   11888 =>0     2
        //three  12444 =>2
        //2 pair 88113 =>1     3
        //1 pair 99123 =>3
        //high   12345 =>5

        switch (temp) {
            case 0: {
                if (tempSet.size === 1) {
                    hashMap["five"].push(game);
                } else {
                    hashMap["full"].push(game);
                }
                break;
            }
            case 1: {
                if (tempSet.size === 2) {
                    hashMap["four"].push(game);
                } else {
                    hashMap["2pair"].push(game);
                }
                break;
            }
            case 2: {
                hashMap["three"].push(game);
                break;
            }
            case 3: {
                hashMap["1pair"].push(game);
                break;
            }
            default: {
                hashMap["high"].push(game);
                break;
            }
        }
    }

    const data = input.map((line) => line.split(" "));

    let rank = 0;
    data.forEach((line) => {
        processGame(line as game);
        rank++;
    });

    for (let type in hashMap) {
        hashMap[type].sort((a: game, b: game) => {
            const points = { A: 14, K: 13, Q: 12, J: 11, T: 10, "9": 9, "8": 8, "7": 7, "6": 6, "5": 5, "4": 4, "3": 3, "2": 2 };

            for (let i = 0; i < a[0].length; i++) {
                if (a[0][i] === b[0][i]) continue;

                if (points[a[0][i]] > points[b[0][i]]) return -1;
                else return 1;
            }
            return 1;
        });
    }
    console.log("total winnings", rank);
    let sum = 0;
    let total = 0;
    for (let type in hashMap) {
        sum = hashMap[type].reduce((acc, next) => {
            acc += Number(next[1]) * rank;
            rank--;
            return acc;
        }, 0);
        total += sum;
    }

    //console.log("sorted hashmap", hashMap);

    console.log("total score", total);
    return "part1";
};

const part2 = (): string => {
    return "part2";
};

console.log("Day 1 - Part 1:", part1());
//console.log("Day 1 - Part 2:", part2());
