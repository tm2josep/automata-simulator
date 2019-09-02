export class Vector2 {
    constructor(to, from = { x: 0, y: 0 }) {
        this.from = from;
        this.to = to;
    }

    get vec() {
        let u = { x: 0, y: 0 }
        u.x = (this.to.x - this.from.x);
        u.y = (this.to.y - this.from.y);
        return u;
    }

    get unitVec() {
        let u = this.vec;
        let vectorNorm = Math.sqrt(Math.pow(u.x, 2) + Math.pow(u.y, 2));
        u.x /= vectorNorm;
        u.y /= vectorNorm;
        return u;
    }

    rotate(angle) {
        const p = {
            x: this.from.x + this.vec.x * 0.5,
            y: this.from.y + this.vec.y * 0.5
        }

        const s = Math.sin(angle);
        const c = Math.cos(angle);

        p.x = c * (p.x - this.from.x) - s * (p.y - this.from.y) + this.from.x;
        p.y = s * (p.x - this.from.x) + c * (p.y - this.from.y) + this.from.y;
        this.to = p;
        return p;
    }

    get length() {
        let { x, y } = this.vec;
        return Math.sqrt(x * x + y * y);
    }
}