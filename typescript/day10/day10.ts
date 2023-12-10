import { readFileSync } from "fs";

const input: string[] = readFileSync("data1", "utf-8").split("\n");

const part1 = (): number => {
    const data = input.map((line) => line.split(""));
    //console.table(data);

    type position = { row: number; col: number };

    const startPipesLookU = ["|", "7", "F"];
    const startPipesLookD = ["|", "L", "J"];
    const startPipesLookL = ["-", "F", "L"];
    const startPipesLookR = ["-", "7", "J"];

    class Runner {
        start: position;
        current: position;
        prev: position;
        temp: position;
        size: number;

        constructor() {
            this.current = { row: 0, col: 0 };
            this.prev = { row: 0, col: 0 };
            this.start = this.findStart();
        }

        findStart(): position {
            for (let row = 0; row < data.length; row++) {
                for (let col = 0; col < data[0].length; col++) {
                    if (data[row][col] === "S") {
                        return { row, col };
                    }
                }
            }
            return { row: 0, col: 0 };
        }
        findFirstPipe(current: position): position {
            if (current.row > 0)
                if (startPipesLookU.filter((x) => x !== data[current.row][current.col]).includes(data[current.row - 1][current.col])) {
                    return { row: current.row - 1, col: current.col };
                }
            if (current.row < data.length - 1)
                if (startPipesLookD.filter((x) => x !== data[current.row][current.col]).includes(data[current.row + 1][current.col])) {
                    return { row: current.row + 1, col: current.col };
                }

            if (current.col > 0)
                if (startPipesLookL.filter((x) => x !== data[current.row][current.col]).includes(data[current.row][current.col - 1])) {
                    return { row: current.row, col: current.col - 1 };
                }
            if (current.col < data[0].length - 1)
                if (startPipesLookR.filter((x) => x !== data[current.row][current.col]).includes(data[current.row][current.col + 1])) {
                    return { row: current.row, col: current.col + 1 };
                }
            return { row: 0, col: 0 };
        }

        gotoNextPipe(): void {
            // console.log(data[this.current.row][this.current.col]);
            switch (data[this.current.row][this.current.col]) {
                case "|": {
                    this.current.row === this.prev.row + 1 ? this.current.row++ : this.current.row--;
                    break;
                }
                case "-": {
                    this.current.col === this.prev.col + 1 ? this.current.col++ : this.current.col--;
                    break;
                }
                case "L": {
                    this.current.row === this.prev.row ? this.current.row-- : this.current.col++;
                    break;
                }
                case "J": {
                    this.current.row === this.prev.row ? this.current.row-- : this.current.col--;
                    break;
                }
                case "7": {
                    this.current.row === this.prev.row ? this.current.row++ : this.current.col--;
                    break;
                }
                case "F": {
                    this.current.row === this.prev.row ? this.current.row++ : this.current.col++;
                    break;
                }
                default:
                    throw new Error("error");
            }
        }

        loop(): number {
            this.size = 1;
            this.prev = this.start;
            this.current = this.findFirstPipe(this.findStart());

            while (data[this.current.row][this.current.col] !== "S") {
                this.temp = { ...this.current };
                //  console.log("size", this.size, "prev", this.prev, "current", this.current);
                this.gotoNextPipe();
                this.prev = this.temp;
                this.size++;
                //  console.log("size", this.size, "prev", this.prev, "current", this.current);
                // console.log("---------------------------------------------------------");
            }

            return this.size;
        }
    }

    const mazeRunner = new Runner();

    return mazeRunner.loop() / 2;
};

const part2 = (): number => {
    return 0;
};

console.time();
console.log("Day 1 - Part 1:", part1());
console.timeEnd();
console.time();
console.log("Day 1 - Part 2:", part2());
console.timeEnd();
