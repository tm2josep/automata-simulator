import { toast } from "../toast.js";

export class Setup {
    constructor() {
        this._sigma = [];
        this._input = [];
    }

    set input(str) {
        if (typeof str !== 'string') {
            toast('Input not a string', 'failure');
        }

        this._input = str.split('').reverse();
    }

    get input() {
        return this._input.reverse().join('');
    }

    set alphabet(str) {
        if (typeof str !== 'string') {
            toast('Alphabet not a string', 'failure');
        }

        this._sigma = [... new Set(str.split(''))];

        return this.alphabet;
    }

    get alphabet() {
        return this._sigma.join('');
    }

    next() {
        let n = this._input.pop();
        document.getElementById('inputs').value = this.input;
        return n;
    }

    check() {
        return this._input.every((char) => {
            return this._sigma.includes(char)
        });
    }


}