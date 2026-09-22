const canvas = document.getElementById("ripples");
const ctx = canvas.getContext("2d");

const ripples = [];
const spacing = 30; // this is how many pixels the mouse has to move before a new ripple spawns
let lastX = null;
let lastY = null;

const lifetime = 800; // in ms
const maxRadius = 40;

function resize () {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

function addRipple(x, y) {
    ripples.push({x, y, born: performance.now()})
}

function onMove(e) {
    if (lastX !== null && Math.hypot(e.clientX - lastX, e.clientY - lastY) < spacing) return;
    lastX = e.clientX;
    lastY = e.clientY;
    addRipple(e.clientX, e.clientY);
}

function draw(now) {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        const t = Math.max(0, (now - r.born) / lifetime);

        if (t >= 1) {
            ripples.splice(i, 1);
            continue;
        }

        ctx.beginPath();
        ctx.arc(r.x, r.y, t * maxRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 * (1 - t)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }

    requestAnimationFrame(draw);
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion) {
    canvas.remove();
} else {
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", (e) => addRipple(e.clientX, e.clientY));
    requestAnimationFrame(draw);
}
