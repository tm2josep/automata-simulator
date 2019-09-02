import { toast } from './toast.js';
import { ShapeHandler } from './Shapes.js'
import { MouseEventHandler } from './MouseEventHandler.js';
import { Setup } from './ConfigManagers/Setup.js';

export class Automata {
    constructor(startState) {
        this.shapes = new ShapeHandler();
        this.startState = startState;
        this.states = [startState];
        this.history = [startState];
        this.setup = new Setup();
        this.input = new MouseEventHandler(this);
    }

    get current() {
        return this.history[0];
    }

    set current(state) {
        this.history.unshift(state);
    }

    reset() {
        this.history = [];
        this.current = this.startState;
    }

    addState(...states) {
        this.states = [...states, ...this.states];
    }

    draw(context) {
        this.shapes.background(context);
        this.states.forEach(state => {
            console.log(state);
            state.active = state.id === this.current.id;
            this.shapes.state(context, state);

            Object.values(state.transitions)
                .forEach(endStateId => {
                    let endState = this.states.find(es => es.id === endStateId);
                    this.shapes.arrow(context, state, endState);
                })
        });
    }

    go(context, interval = 100) {
        if (!this.setup.check()) {
            toast('Invalid Setup', 'failure');
            return;
        }

        let char = this.setup.next();
        this.next(char, context);
        if (this.setup.input) {
            setTimeout(() => this.go(context, interval), interval);
        }

        else toast('Done', 'success');
    }

    next(input, context) {
        this.current = this.states.find(
            state => state.id === this.current.transition(input)
        );

        if (this.current === undefined) {
            toast('Invalid', 'failure');
            this.setup.input = '';
            this.current = this.startState;
            throw "undefined transition";
        }

        requestAnimationFrame(() => this.draw(context));
    }

}