export function toast(message, type, duration = 2000) {
    let t = document.createElement('div');
    t.classList.add('toast');
    t.classList.add(type == 'success'? '--success': '--failure');
    t.classList.add('swirl-in-fwd')
    t.innerHTML = message;

    document.body.appendChild(t);

    setTimeout(() => {
        t.classList.remove('swirl-in-fwd');
        t.classList.add('swirl-out-bck');
        setTimeout(() => t.remove(), 600);
    }, duration)
}