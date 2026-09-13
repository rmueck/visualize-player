import AudioMotionAnalyzer from
  "https://esm.sh/audiomotion-analyzer?min";

const audio = document.getElementById("audio-player");
const visualizer = document.getElementById("visualizer");
const streamButton = document.getElementById("stream-button");
const version = document.getElementById("library-version");

const analyzer = new AudioMotionAnalyzer(visualizer, {
  source: audio,
  mode: 3,
  barSpace: 0.6,
  ledBars: true,
  showScaleX: true,
  showScaleY: true
});

if (version) {
  version.textContent = `v${AudioMotionAnalyzer.version}`;
}

streamButton.addEventListener("click", () => {
  // const streamUrl = "https://icecast2.ufpel.edu.br/live";
  const streamUrl = "https://babacast.ddns.net/listen/baba_archives/baba-labs.mp3";

  if (audio.src !== streamUrl) {
    audio.src = streamUrl;
    audio.load();
  }

  audio.play().catch((error) => {
    console.error("Unable to play the live stream:", error);
  });
});

window.addEventListener("resize", () => {
  analyzer.setCanvasSize();
});

