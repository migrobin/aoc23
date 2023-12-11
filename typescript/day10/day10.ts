import { readFileSync } from "fs";

const input: string[] = readFileSync("data", "utf-8").split("\n");

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
    const data = input.map((line) =>
        line.split("").map((el) => ({
            char: el,
            mark: ".",
        }))
    );

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
                    if (data[row][col].char === "S") {
                        return { row, col };
                    }
                }
            }
            return { row: 0, col: 0 };
        }
        findFirstPipe(current: position): position {
            if (
                current.row > 0 &&
                startPipesLookU.filter((x) => x !== data[current.row][current.col].char).includes(data[current.row - 1][current.col].char)
            )
                return { row: current.row - 1, col: current.col };

            if (
                current.row < data.length - 1 &&
                startPipesLookD.filter((x) => x !== data[current.row][current.col].char).includes(data[current.row + 1][current.col].char)
            )
                return { row: current.row + 1, col: current.col };

            if (
                current.col > 0 &&
                startPipesLookL.filter((x) => x !== data[current.row][current.col].char).includes(data[current.row][current.col - 1].char)
            )
                return { row: current.row, col: current.col - 1 };

            if (
                current.col < data[0].length - 1 &&
                startPipesLookR.filter((x) => x !== data[current.row][current.col].char).includes(data[current.row][current.col + 1].char)
            )
                return { row: current.row, col: current.col + 1 };

            return { row: 0, col: 0 };
        }

        gotoNextPipe(): void {
            switch (data[this.current.row][this.current.col].char) {
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
            data[this.start.row][this.start.col].mark = "B";

            while (data[this.current.row][this.current.col].char !== "S") {
                this.temp = { ...this.current };
                data[this.current.row][this.current.col].mark = "B";
                this.gotoNextPipe();
                this.prev = this.temp;
                this.size++;
            }
            return this.size;
        }
    }

    const mazeRunner = new Runner();

    const toCheck: position[] = [];

    function findPossibleNeighbors(pos: position): void {
        let offsetRow = 0;
        let offsetCol = 0;

        if (pos.row === 0) offsetRow = 1;
        if (pos.row === data.length - 1) offsetRow = -1;

        if (pos.col === 0) offsetCol = 1;
        if (pos.col === data[0].length - 1) offsetCol = -1;

        for (let i = pos.row - 1 + offsetRow; i < pos.row + 2 + offsetRow; i++) {
            for (let j = pos.col - 1 + offsetCol; j < pos.col + 2 + offsetCol; j++) {
                if (data[i][j].mark !== "x" && data[i][j].mark !== "B") toCheck.push({ row: i, col: j });
            }
        }
    }

    let temp: position | undefined;
    function bfs(pos: position): void {
        toCheck.push(pos);
        while (toCheck.length > 0) {
            temp = toCheck.pop();
            if (temp) {
                data[temp.row][temp.col].mark = "x";
                //   console.log(toCheck);
                findPossibleNeighbors(temp);
                //  console.log(toCheck);
            }
        }
    }

    mazeRunner.loop();

    for (let row = 0; row < data.length; row++) {
        if (data[row][0].mark !== "B") bfs({ row, col: 0 });
        if (data[row][data[0].length - 1].mark !== "B") bfs({ row, col: data[0].length - 1 });

        for (let col = 0; col < data[0].length; col++) {
            if (data[0][col].mark !== "B") bfs({ row: 0, col });
            if (data[data.length - 1][col].mark !== "B") bfs({ row: data.length - 1, col });
        }
    }

    console.table(data.map((el) => el.map((el) => el.mark)));

    return 1;
};

//console.log("Day 1 - Part 1:", part1());
console.time();
console.log("Day 1 - Part 2:", part2());
console.timeEnd();
