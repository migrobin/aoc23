import { readFileSync } from "fs";

const input: string = readFileSync("data1", "utf-8");
const data = input.split("\n").map((line) => line.split(":"));

const result: number[] = [];

const part1 = (): string => {
    const maxColor = new Map([
        ["red", 12],
        ["green", 13],
        ["blue", 14],
    ]);

    const games = data.map((line) =>
        line.map((element) =>
            element
                .split(";")
                .map((element) =>
                    element.split(",").map((element) => element.trim())
                )
        )
    );

    let busted: boolean;
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
                            console.log(
                                "busted  Game",
                                game[0][0][0].replace("Game ", ""),
                                maxColor.get(key),
                                "<",
                                drawArr[0]
                            );
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

const part2 = (): string => {
    return "part2";
};

console.log("Day 1 - Part 1:", part1());
console.log("Day 1 - Part 2:", part2());
