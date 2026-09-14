import AudioMotionAnalyzer from
  "https://esm.sh/audiomotion-analyzer?min";

const audioEl = document.getElementById("audio");

const audioMotion = new AudioMotionAnalyzer(
  document.getElementById("container"),
  {
    source: audioEl,
    // height: window.innerHeight - 50,
    height: window.innerHeight - 10,
    radial: 1,
    radius: 0.3,
    spinSpeed: 0,
    colorMode: "bar-level",
    gradient: "prism",
    fadePeaks: false,
    maxFPS: 25,
    channelLayout: "single",
    splitGradient: 1,
    mode: 3,
    mirror: 0,
    // barSpace: 0.3,
    radialInvert: false,
    ledBars: true,
    volume: 0,
  }
);

// document.getElementById("version").textContent =
//   `v${AudioMotionAnalyzer.version}`;

document.getElementById("live").addEventListener("click", () => {
  // audioEl.src = "https://icecast2.ufpel.edu.br/live";
  audioEl.src = "https://babaganousha.net:8443/;";
  audioEl.play();
});

// document.getElementById("upload").addEventListener("change", (event) => {
//   const file = event.target.files[0];
//
//   if (file) {
//     audioEl.src = URL.createObjectURL(file);
//     audioEl.play();
//   }
// });

