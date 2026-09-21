import AudioMotionAnalyzer from
  "https://esm.sh/audiomotion-analyzer?min";

const audioEl = document.getElementById("audio");

const audioMotion = new AudioMotionAnalyzer(
  document.getElementById("container"),
  {
    source: audioEl,
    // height: window.innerHeight - 10,
    // alphaBars: false,
    // ansiBands: false,
    // barSpace: 0.1,
    // bgAlpha: 0.7,
    // radial: 1,
    // radialInvert: false,
    // spinSpeed: 0,
    // channelLayout: "dual-horizontal",
    // gradient: "prism",
    // splitGradient: 1,
    // showPeaks: 0,
    // // mode: 3,
    // mode: 5,
    // ansiBands: 1,
    // // radius: 0.3,
    // // colorMode: "gradient",
    // colorMode: "bar-level",
    // // fadePeaks: true,
    // maxFPS: 25,
    // // splitGradient: 1,
    // // mode: 3,
    // mirror: 1,
    // // barSpace: 0.3,
    // // peakLine: false,
    // // ledBars: false,
    // // lumiBars: false,

  // mode: 10,

  overlay: true,
  showBgColor: true,
  bgAlpha: 0.5,        // 0 = image fully visible, 1 = image hidden behind bars
  bgImageURL: "bg.jpg", // path to your image
  mode: 5,
  maxFPS: 25,
  showFPS: false,
	loRes: 0,
	connectSpeakers: true,
  volume: true,
	alphaBars: true,
	// alphaBars: false,
  maxFreq: 22000,
  // radial: true,
  radial: false,
  // spinSpeed: -3,
  // radialInvert: true,
  radialInvert: false,
  colorMode: "gradient",
  // showBgColor: true,
  showBgColor: false,
  channelLayout: "single",
  // channelLayout: "dual-horizontal",
  // lumiBars: true,
  lumiBars: false,
  alphaBars: true,
  // alphaBars: false,
  // gradient: 'rainbow',
  gradient: 'prism',
  // gradientLeft: 'prism',
  // gradientRight: 'rainbow',
  // gradient: 'classic',
  splitGradient: false,
  linearAmplitude: false,
	showScaleX: false,
	// showScaleX: true,
	showScaleY: false,
  linearBoost: 1.8,
  showPeaks: true,
  fadePeaks: true,
  peakLine: true,
  // showPeaks: false,
  // fadePeaks: true,
  // fadePeaks: false,
// peakLine: true,
  weightingFilter: 'D',
  // mirror: 1,
  mirror: 1,
  }
);

// document.getElementById("version").textContent =
//   `v${AudioMotionAnalyzer.version}`;

document.getElementById("live").addEventListener("click", () => {
  // audioEl.src = "https://icecast2.ufpel.edu.br/live";
  audioEl.src = "https://babacast.ddns.net/listen/babaazu/baba-radio.mp3";
  audioEl.play();
});

const NP_API = "https://babacast.ddns.net/api/nowplaying/babaazu";
const npEl = document.getElementById("nowplaying");

let npLast = "";

function renderNowPlaying(data) {
  const song = data.now_playing?.song ?? {};
  const title = (song.text || "").replace(/\s*-\s*$/, "").trim();
  if (!title || title === npLast) return;
  npLast = title;

  npEl.textContent = "";
  if (data.live?.is_live) {
    const tag = document.createElement("span");
    tag.className = "np-live";
    tag.textContent = data.live.streamer_name
      ? `[LIVE] ${data.live.streamer_name} —`
      : "[LIVE] —";
    npEl.appendChild(tag);
  }
  npEl.appendChild(document.createTextNode(title));
  npEl.title = title;
}

async function pollNowPlaying() {
  try {
    const r = await fetch(NP_API, { cache: "no-store" });
    if (r.ok) renderNowPlaying(await r.json());
  } catch (e) {
    /* keep last known title on a hiccup */
  }
}

pollNowPlaying();
setInterval(pollNowPlaying, 10000);

const modeToggle = document.getElementById("mode-toggle");

modeToggle.addEventListener("click", () => {
  audioMotion.radial = !audioMotion.radial;
  modeToggle.textContent = audioMotion.radial ? "Radial" : "Bars";
});
