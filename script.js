const executeBtn = document.getElementById("execute-btn");
const watchTrailerBtn = document.getElementById("watch-trailer-btn");
const overrideBar = document.getElementById("override-bar");
const overridePercent = document.getElementById("override-percent");
const logList = document.getElementById("log-list");
const codeRain = document.getElementById("code-rain");

let running = false;

const streamRows = 28;
const streamCols = 64;
const streamChars = "01#@$%&*<>/{}[]";

function renderCodeRain() {
  let output = "";
  for (let row = 0; row < streamRows; row += 1) {
    let line = "";
    for (let col = 0; col < streamCols; col += 1) {
      line += streamChars[Math.floor(Math.random() * streamChars.length)];
    }
    output += `${line}\n`;
  }
  codeRain.textContent = output;
}

setInterval(renderCodeRain, 140);
renderCodeRain();

function pushLog(entry) {
  const li = document.createElement("li");
  li.textContent = `> ${entry}`;
  logList.appendChild(li);
  logList.scrollTop = logList.scrollHeight;
}

function runPayloadSequence() {
  if (running) return;

  running = true;
  executeBtn.disabled = true;
  pushLog("Payload armed. Verifying command signature...");

  let progress = 0;
  const steps = [
    { mark: 18, msg: "Lateral movement complete." },
    { mark: 39, msg: "Power Grid relay permissions escalated." },
    { mark: 63, msg: "Government Data Center route compromised." },
    { mark: 83, msg: "Regional control nodes synchronized." },
    { mark: 100, msg: "SYSTEM OVERRIDE COMPLETE. TOTAL CONTROL." }
  ];

  const timer = setInterval(() => {
    progress += Math.ceil(Math.random() * 6);
    if (progress > 100) progress = 100;

    overrideBar.style.width = `${progress}%`;
    overridePercent.textContent = `${progress}%`;

    for (const step of steps) {
      if (!step.done && progress >= step.mark) {
        pushLog(step.msg);
        step.done = true;
      }
    }

    if (progress === 100) {
      clearInterval(timer);
      document.body.classList.add("is-flickering");
      pushLog("All screens offline except primary command feed.");
      setTimeout(() => {
        executeBtn.disabled = false;
        running = false;
        document.body.classList.remove("is-flickering");
      }, 2200);
    }
  }, 190);
}

executeBtn.addEventListener("click", runPayloadSequence);

watchTrailerBtn.addEventListener("click", () => {
  pushLog("Trailer uplink requested. Stand by...");
  const sceneSection = document.querySelector(".scene");
  sceneSection.scrollIntoView({ behavior: "smooth" });
});
