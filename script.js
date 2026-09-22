import AudioMotionAnalyzer from
  "https://esm.sh/audiomotion-analyzer?min";

const audioEl = document.getElementById("audio");

const audioMotion = new AudioMotionAnalyzer(
  document.getElementById("container"),
  {
  source: audioEl,

  height: window.innerHeight - 10,
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
  maxFreq: 22000,
  radial: false,
  radius: 0.4,
  spinSpeed: 0,
  radialInvert: true,
  colorMode: "gradient",
  // channelLayout: "single",
  channelLayout: "dual-horizontal",
  lumiBars: false,
  alphaBars: true,
  // alphaBars: false,
  gradient: 'rainbow',
  // gradient: 'prism',
  // gradientLeft: 'prism',
  gradient: 'prism',
  // gradientLeft: 'rainbow',
  // gradientRight: 'rainbow',
  splitGradient: false,
  linearAmplitude: false,
	showScaleX: false,
	showScaleY: false,
  linearBoost: 1.8,
  showPeaks: true,
  fadePeaks: true,
  peakLine: true,
  weightingFilter: 'D',
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
