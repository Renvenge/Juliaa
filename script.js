const NS = "http://www.w3.org/2000/svg";
const canopy = document.getElementById("heartCanopy");
const colors = ["#e94d88", "#f17aa5", "#f7a8be", "#f28a69", "#f4bd48", "#dc4b79", "#ffcfb8"];
const heartPath = "M 0 -5 C -2 -9 -8 -8 -8 -3 C -8 1 -3 5 0 8 C 3 5 8 1 8 -3 C 8 -8 2 -9 0 -5 Z";

function insideHeart(x, y) {
  const X = (x - 350) / 230;
  const Y = (y - 350) / 220;
  return Math.pow(X * X + Y * Y - 1, 3) - X * X * Y * Y * Y <= 0;
}

function makeHeart(x, y, size, color, delay = 0) {
  const g = document.createElementNS(NS, "g");
  g.setAttribute("class", "heart");
  g.setAttribute("transform", `translate(${x} ${y}) rotate(${Math.random()*50-25}) scale(${size/10})`);
  g.style.animationDelay = `${delay}s`;
  const p = document.createElementNS(NS, "path");
  p.setAttribute("d", heartPath);
  p.setAttribute("fill", color);
  p.setAttribute("stroke", "#ffffff");
  p.setAttribute("stroke-opacity", ".22");
  p.setAttribute("stroke-width", ".7");
  g.appendChild(p);
  canopy.appendChild(g);
  return g;
}

// A heart-shaped canopy, slightly irregular so it feels handmade.
let placed = 0, attempts = 0;
while (placed < 330 && attempts < 4000) {
  attempts++;
  const x = 350 + (Math.random() * 2 - 1) * 245;
  const y = 330 + (Math.random() * 2 - 1) * 220;
  if (!insideHeart(x, y)) continue;
  const size = 7 + Math.random() * 12;
  makeHeart(x, y, size, colors[Math.floor(Math.random() * colors.length)], Math.random() * .9);
  placed++;
}

// A few drifting hearts outside the canopy.
const floatLayer = document.getElementById("floatingHearts");
for (let i = 0; i < 18; i++) {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = "♥";
  heart.style.left = `${Math.random() * 96}%`;
  heart.style.top = `${10 + Math.random() * 82}%`;
  heart.style.fontSize = `${10 + Math.random() * 18}px`;
  heart.style.color = colors[Math.floor(Math.random() * colors.length)];
  heart.style.animationDelay = `${Math.random() * -7}s`;
  floatLayer.appendChild(heart);
}

const button = document.getElementById("shootButton");
const arrow = document.getElementById("arrowGroup");
const string = document.getElementById("string");
const scene = document.querySelector(".scene");
const hint = document.getElementById("hint");
let firing = false;

button.addEventListener("click", () => {
  if (firing) return;
  firing = true;
  button.disabled = true;
  button.textContent = "💘";
  hint.textContent = "Um desejo lançado ao universo…";
  string.setAttribute("x2", "83");
  const target = document.querySelector(".birthday-copy h1");
  arrow.style.transition = "transform 850ms cubic-bezier(.15,.75,.25,1), opacity 300ms 650ms";
  arrow.style.transform = "translate(420px, -150px) rotate(-8deg)";
  setTimeout(() => {
    target.classList.remove("impact");
    void target.offsetWidth;
    target.classList.add("impact");
    for (let i = 0; i < 26; i++) {
      const heart = document.createElement("span");
      heart.className = "floating-heart";
      heart.textContent = "♥";
      heart.style.left = `${35 + Math.random() * 35}%`;
      heart.style.top = `${42 + Math.random() * 22}%`;
      heart.style.fontSize = `${12 + Math.random() * 20}px`;
      heart.style.color = colors[Math.floor(Math.random() * colors.length)];
      heart.style.animationDuration = `${2 + Math.random() * 3}s`;
      floatLayer.appendChild(heart);
      setTimeout(() => heart.remove(), 5000);
    }
  }, 650);
  setTimeout(() => {
    arrow.style.transition = "none";
    arrow.style.transform = "translate(0, 0)";
    string.setAttribute("x2", "55");
    button.disabled = false;
    button.textContent = "Atirar outra vez";
    hint.textContent = "O amor sempre encontra um caminho 💗";
    firing = false;
  }, 1800);
});

document.getElementById("year").textContent = new Date().getFullYear();
