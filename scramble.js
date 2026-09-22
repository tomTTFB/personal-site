const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";

function scramble(el, duration, delay) {
    const original = el.textContent;
    let start = null;

    function frame(now) {
        if (start === null) start = now + delay

        const progress = Math.min(1, Math.max(0 , (now - start) / duration));
        const revealed = Math.floor(progress * original.length);

        let output = "";
        for (let i = 0; i < original.length; i++) {
            const c = original[i];
            if (i < revealed || c === " ") {
                output += c;
            } 
            else {
                output += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];

            }
        }
        el.textContent = output;

        if (progress < 1) requestAnimationFrame(frame)
    }

    requestAnimationFrame(frame);
}

const scrambleReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!scrambleReduced) {
  const targets = document.querySelectorAll(".maindiv h1, .maindiv h4, .maindiv p");

  document.fonts.ready.then(() => {
    targets.forEach((el, i) => scramble(el, 600, i * 150));
  });
}

const box = document.querySelector(".maindiv");
box.style.width = box.offsetWidth + "px";