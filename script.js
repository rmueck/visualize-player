import AudioMotionAnalyzer from
  "https://esm.sh/audiomotion-analyzer?min";

const audioEl = document.getElementById("audio");

const audioMotion = new AudioMotionAnalyzer(
  document.getElementById("container"),
  {
    source: audioEl,
    height: window.innerHeight - 50,
    radial: 1,
    gradient: "prism",
    mode: 3,
    barSpace: 0.6,
    ledBars: true
  }
);

document.getElementById("version").textContent =
  `v${AudioMotionAnalyzer.version}`;

document.getElementById("live").addEventListener("click", () => {
  // audioEl.src = "https://icecast2.ufpel.edu.br/live";
  audioEl.src = "https://babaganousha.net:8443/;";
  audioEl.play();
});

document.getElementById("upload").addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (file) {
    audioEl.src = URL.createObjectURL(file);
    audioEl.play();
  }
});

