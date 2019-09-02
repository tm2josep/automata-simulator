import { Automata } from "../Automata.js";
import { State } from "../State.js";

export class ConfigManager {
    constructor() {
        this.data;
    }

    parse() {
        let stateNames = Object.keys(this.data);
        let start = stateNames[0];

        const startPos = this.statePosition(this.data[start]);

        let a = new Automata(
            new State(
                start,
                this.data[start].transitions,
                startPos.x,
                startPos.y
            )
        );

        stateNames.shift();

        let newStates = stateNames.map(
            (state, index) => {
                const pos = this.statePosition(this.data[state], index);
                return new State(
                    state,
                    this.data[state].transitions,
                    pos.x,
                    pos.y
                );
            });

        a.addState(...newStates);

        return a;

    }

    statePosition(stateData, index) {
        const position = stateData.position;
        const defaultPos = {
            x: index === undefined ? 100 : (index % 8) * 150 + 200,
            y: index === undefined ? 100 : (Math.floor(index / 8) * 150) + 200
        };
        console.log(defaultPos);

        if (!position) {
            return defaultPos;
        }

        if (
            typeof position.x !== 'number' ||
            typeof position.y !== 'number'
        ) {
            return defaultPos;
        }

        return position;
    }
}

export class ConfigJsonParser extends ConfigManager {
    constructor(url) {
        super();
        this.url = url;
    }

    async get() {
        let r = await fetch(this.url);
        r = await r.json();
        this.data = r;
        return;
    }
}
