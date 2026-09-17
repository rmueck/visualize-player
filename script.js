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
    radialInvert: false,
    channelLayout: "dual-horizontal",
    gradient: "rainbow",
    splitGradient: 1,
    showPeaks: 0,
    mode: 3,
    // mode: 5,
    ansiBands: 1,
    // radius: 0.3,
    // spinSpeed: 0,
    // colorMode: "gradient",
    // fadePeaks: true,
    maxFPS: 25,
    // channelLayout: "single",
    // splitGradient: 1,
    // mode: 3,
    // mirror: 1,
    // barSpace: 0.3,
    // peakLine: false,
    // ledBars: false,
    // lumiBars: false,
    volume: 1,
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
