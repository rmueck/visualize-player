const apiUrl =
  "https://babacast.ddns.net/api/nowplaying/babaazu";

const titleElement = document.querySelector("#song-title");
const artistElement = document.querySelector("#song-artist");
const artElement = document.querySelector("#song-art");
const listenersElement = document.querySelector("#listener-count");

let previousSongId = null;

async function updateNowPlaying() {
  try {
    const response = await fetch(`${apiUrl}?_=${Date.now()}`, {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const current = data.now_playing;
    const song = current?.song;

    if (!song) {
      titleElement.textContent = "Nothing currently playing";
      artistElement.textContent = "";
      return;
    }

    titleElement.textContent = song.title || "Unknown title";
    artistElement.textContent = song.artist || "Unknown artist";

    if (song.art) {
      artElement.src = song.art;
      artElement.alt = `${song.artist || "Unknown artist"} album artwork`;
    }

    if (data.listeners) {
      listenersElement.textContent =
        `${data.listeners.current} listener` +
        (data.listeners.current === 1 ? "" : "s");
    }

    // Optional: run code only when the track changes.
    if (song.id !== previousSongId) {
      previousSongId = song.id;
      document.dispatchEvent(new CustomEvent("songChanged", {
        detail: song
      }));
    }
  } catch (error) {
    console.error("Could not load AzuraCast metadata:", error);
    titleElement.textContent = "Unable to load current track";
    artistElement.textContent = "";
  }
}

updateNowPlaying();
setInterval(updateNowPlaying, 15_000);

