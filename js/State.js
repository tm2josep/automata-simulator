import { SHAPEPROPERTIES } from "./Shapes.js";

export class State {
    constructor(id, transitionSet = {}, x = 100, y = 100) {
        this.id = id;
        this.transitions = transitionSet;
        this.x = x;
        this.y = y;
        this.active = false;
    }

    inside(x, y, {radius}) {
        return (
            (x <= this.x + (radius * 2) && x >= this.x - (radius * 2)) &&
            (y <= this.y + (radius * 2) && y >= this.y - (radius * 2))
        )
    }

    transition(input) {
        return this.transitions[input];
    }

    setTransition(input, stateId) {
        this.transitions[input] = stateId;
    }

    isValid(characters, stateIds) {
        let check =
            Object.keys(this.transitions).sort() === characters.sort() &&
            Object.values(this.transitions).filter((id) => {
                return !stateIds.includes(id);
            }).length == 0; // Contains a state not provided
        return check;
    }
}