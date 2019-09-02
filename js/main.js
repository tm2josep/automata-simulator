import { ConfigJsonParser } from './ConfigManagers/ConfigJsonParser.js'; 

// setup graphics buffer
let c = document.getElementById('screen');
let ctx = c.getContext('2d');

let automata;
let parser = new ConfigJsonParser('../fa_config.json');
parser.get().then(() => {
    automata = parser.parse();
    automata.draw(ctx);
});

['mousemove', 'mousedown', 'mouseup', 'wheel'].forEach(event => {
    c.addEventListener(event, e => {
        automata.input.dispatcher(e);
        automata.draw(ctx);
    });
});

document.querySelector('div.button').addEventListener('click', () => {
    automata.setup.input = document.getElementById('inputs').value;
    automata.setup.alphabet = document.getElementById('characters').value;
    automata.reset();
    automata.go(ctx, 200);
});