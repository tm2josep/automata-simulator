import { toast } from "./toast.js";

export class MouseEventHandler {
    constructor(automata) {
        this.selectedState;
        this.automata = automata;
    }

    dispatcher(event) {
        switch (event.type) {
            case 'mousedown':
                this.mouseDown(event);
                break;
            case 'mousemove':
                this.mouseMove(event);
                break;
            case 'mouseup':
                this.mouseUp(event);
                break;
            case 'wheel':
                this.zoom(event);
                break;
            default:
                toast('Does Nothing', 'failure');
                break;
        }
    }

    zoom({ deltaY }) {
        this.automata.shapes.zoom(deltaY);
    }

    mouseDown({ layerX: x, layerY: y }) {
        let states = this.automata.states.filter(state => state.inside(x, y, this.automata.shapes));
        if (this.selectedState == undefined) {
            this.selectedState = states[0];
        }
    }

    mouseMove({ layerX: x, layerY: y }) {
        if (this.selectedState) {
            this.selectedState.x = x;
            this.selectedState.y = y;
        }
    }

    mouseUp(event) {
        this.selectedState = undefined;
    }


}