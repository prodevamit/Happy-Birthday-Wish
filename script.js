const cake = document.querySelector(".cake");
const clappers = document.querySelectorAll(".clapper");
const cakeScene = document.getElementById("cakeScene");
const celebrationScene = document.getElementById("celebrationScene");
const partyBg = document.querySelector(".party-bg");

let clicked = false;

cake.addEventListener("click", () => {
  if (clicked) return;
  clicked = true;

  partyBg.classList.add("active");

  clappers.forEach((c, i) => {
    setTimeout(() => {
      c.classList.add("pop");
      confettiFromTop(c, 50);
    }, i * 150);
  });

  setTimeout(() => {
    cakeScene.style.display = "none";
    celebrationScene.classList.remove("hidden");
  }, 1500);
});

function confettiFromTop(el, count) {
  const rect = el.getBoundingClientRect();
  const startX = rect.left + rect.width / 2;
  const colors = ["#ff3d3d", "#ffd93d", "#3dc8ff", "#3dff9e", "#ffffff"];

  for (let i = 0; i < count; i++) {
    const conf = document.createElement("div");
    const type = Math.floor(Math.random() * 3);
    const color = colors[Math.floor(Math.random() * colors.length)];

    conf.style.position = "fixed";
    conf.style.left = startX + (Math.random() * 40 - 20) + "px";
    conf.style.top = "-20px";
    conf.style.pointerEvents = "none";

    if (type === 0) {
      /* 🎊 TRIANGLE */
      conf.style.width = "0";
      conf.style.height = "0";
      conf.style.borderLeft = "6px solid transparent";
      conf.style.borderRight = "6px solid transparent";
      conf.style.borderBottom = `12px solid ${color}`;
    } else if (type === 1) {
      /* 🎉 RIBBON */
      conf.style.width = "4px";
      conf.style.height = "16px";
      conf.style.background = color;
      conf.style.borderRadius = "2px";
    } else {
      /* 🎈 CIRCLE */
      conf.style.width = "8px";
      conf.style.height = "8px";
      conf.style.background = color;
      conf.style.borderRadius = "50%";
    }

    document.body.appendChild(conf);

    let y = -20;
    let xDrift = (Math.random() - 0.5) * 1.2;
    let fallSpeed = Math.random() * 1.2 + 0.6;
    let rotation = Math.random() * 360;

    function fall() {
      y += fallSpeed;
      rotation += 2;
      conf.style.transform =
        `translate(${xDrift * y}px, ${y}px) rotate(${rotation}deg)`;

      if (y < window.innerHeight + 40) {
        requestAnimationFrame(fall);
      } else {
        conf.remove();
      }
    }
    fall();
  }
}
