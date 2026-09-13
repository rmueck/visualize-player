import AudioMotionAnalyzer from
  "https://esm.sh/audiomotion-analyzer?min";

const audioEl = document.getElementById("audio");

const audioMotion = new AudioMotionAnalyzer(
  document.getElementById("container"),
  {
    source: audioEl,
    height: window.innerHeight - 50,
    mode: 3,
    radial: 1,
    showPeaks: 1,
    gradient: "prism",
    barSpace: 0.6,
    ledBars: true
  }
);

document.getElementById("version").textContent =
  `v${AudioMotionAnalyzer.version}`;

document.getElementById("live").addEventListener("click", () => {
  audioEl.src = "https://babaganousha.net:8443/radio.mp3";
  audioEl.play();
});

document.getElementById("upload").addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (file) {
    audioEl.src = URL.createObjectURL(file);
    audioEl.play();
  }
});

