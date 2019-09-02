import { Vector2 } from "./Vector2.js";

export class SHAPEPROPERTIES {
    constructor() {
        this.ACTIVE = 'lightgreen';
        this.INACTIVE = 'white';
        this.BACKGROUND = 'black';
        this.FONTFACE = 'Roboto';

        this.fontsize = 25;
        this.radius = 25;
    }

    get font() {
        return `${this.fontsize}px ${this.FONTFACE}`;
    }

    zoom(delta) {
        this.radius += delta / 100;
        this.fontsize += delta / 100;
    }
}

export class ShapeHandler extends SHAPEPROPERTIES {
    constructor() { super(); }

    background(context) {
        context.save();
        context.fillStyle = this.BACKGROUND
        context.fillRect(0, 0, 800, 800);
        context.restore();
    }

    state(context, { id, x, y, active }) {
        context.save();
        context.strokeStyle = active ? this.ACTIVE : this.INACTIVE;
        context.fillStyle = active ? this.ACTIVE : this.INACTIVE;
        context.beginPath();
        context.ellipse(x, y, this.radius * 2, this.radius * 2, 0, 0, 360, false);
        context.stroke();
        context.font = this.font;
        context.textAlign = "center";
        context.fillText(id, x, y + 10);
        context.restore();
    }

    arrowSelf(context, { x, y }) {

        context.save();

        context.strokeStyle = 'white';
        context.beginPath();
        context.arc(x, y - (2 * this.radius), this.radius, 0.90 * Math.PI, 0.25);
        context.stroke();
        context.restore();

        context.save();

        let v = new Vector2(
            { x, y },
            { x: x, y: y - this.radius }
        );

        v.rotate(0.25);

        this.arrowHead(context, v.to, { x: v.vec.x * 3, y: v.vec.y * 3 }, 8, 0);

        context.restore();
    }

    arrow(context, startState, endState) {
        if (startState.id == endState.id) {
            this.arrowSelf(context, startState);
        }
        // make Unit vector
        let u = new Vector2(
            { x: endState.x, y: endState.y },
            { x: startState.x, y: startState.y }
        )

        let sp1 = { x: 0, y: 0 };
        let sp2 = { x: 0, y: 0 };

        // scale unitvector
        sp1.x = startState.x + u.unitVec.x * this.radius * 2;
        sp1.y = startState.y + u.unitVec.y * this.radius * 2;
        sp2.x = endState.x - u.unitVec.x * this.radius * 2;
        sp2.y = endState.y - u.unitVec.y * this.radius * 2;

        // draw vector
        this.lineAndLabel(
            context,
            { // line
                x0: sp1.x,
                y0: sp1.y,
                x1: sp2.x,
                y1: sp2.y
            },
            Object.keys( // text
                Object.keys(startState.transitions).reduce((p, c) => {
                    if (startState.transitions[c] == endState.id)
                        p[c] = startState.transitions[c];
                    return p;
                }, {})
            ).join(', '));

        context.save();
        this.arrowHead(context, sp1, sp2, 8);
        context.restore();
    }

    arrowHead(context, from, to, radius, adjustment = (Math.PI / 6.5)) {
        context.save();
        context.fillStyle = 'white';

        let x_center = to.x;
        let y_center = to.y;

        let angle;
        let x;
        let y;

        context.beginPath();

        angle = Math.atan2(to.y - from.y, to.x - from.x) - adjustment
        x = radius * Math.cos(angle) + x_center;
        y = radius * Math.sin(angle) + y_center;

        context.moveTo(x, y);

        angle += (1.0 / 3.0) * (2 * Math.PI)
        x = radius * Math.cos(angle) + x_center;
        y = radius * Math.sin(angle) + y_center;

        context.lineTo(x, y);

        angle += (1.0 / 3.0) * (2 * Math.PI)
        x = radius * Math.cos(angle) + x_center;
        y = radius * Math.sin(angle) + y_center;

        context.lineTo(x, y);

        context.closePath();
        context.fill();
        context.restore();
    }

    lineAndLabel(context, line, text, angle = Math.PI / 6) {

        // save the unmodified context state
        context.save();

        // calc width of text
        context.font = this.font;
        let textwidth = context.measureText(text).width;

        // draw the line
        context.beginPath();
        context.moveTo(line.x0, line.y0);

        let point = new Vector2(
            { x: line.x1, y: line.y1 },
            { x: line.x0, y: line.y0 }
        );

        point.rotate(angle);

        context.quadraticCurveTo(point.to.x, point.to.y, line.x1, line.y1);

        context.lineWidth = 2;
        context.strokeStyle = 'white';
        context.stroke();

        // clear the line at the midpoint
        context.globalCompositeOperation = 'destination-out'; // "erases"
        context.fillStyle = 'black';
        context.fillRect(point.to.x - textwidth / 2, point.to.y - this.fontsize / 2, textwidth, this.fontsize * 1.286);
        context.globalCompositeOperation = 'source-over';  // reset to default

        // tell canvas to horizontally & vertically center text around an [x,y]
        context.textAlign = 'center';
        context.textBaseline = 'middle'

        // draw text at the midpoint
        context.fillStyle = 'white';
        context.fillText(text, point.to.x, point.to.y);

        // restore the unmodified context state
        context.restore();
    }
}