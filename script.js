const playlist = [
    { title: "show u luv", artist: "Blxkie", src: "assets/song_1.mp3", duration: "2:42" },
    { title: "Neon Pulse", artist: "Synth Lord", src: "assets/song2.mp3", duration: "4:10" },
    { title: "Electric Dreams", artist: "AI DJ", src: "assets/song3.mp3", duration: "2:50" }
];

const audio = new Audio();
let currentIndex = 0;

const playPauseBtn = document.getElementById("playPause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const volumeControl = document.getElementById("volume");
const playlistContainer = document.getElementById("playlist");
const currentSongDisplay = document.getElementById("current-song");

// Load Playlist
playlist.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist} (${song.duration})`;
    li.addEventListener("click", () => playSong(index));
    playlistContainer.appendChild(li);
});

// Play/Pause Toggle
playPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = "⏸";
    } else {
        audio.pause();
        playPauseBtn.textContent = "▶️";
    }
});

// Play Selected Song
function playSong(index) {
    currentIndex = index;
    audio.src = playlist[index].src;
    audio.play();
    playPauseBtn.textContent = "⏸";
    currentSongDisplay.textContent = `Now Playing: ${playlist[index].title} - ${playlist[index].artist}`;
}

// Next Song
nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % playlist.length;
    playSong(currentIndex);
});

// Previous Song
prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    playSong(currentIndex);
});

// Update Progress Bar
audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100 || 0;
});

// Seek Functionality
progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume Control
volumeControl.addEventListener("input", () => {
    audio.volume = volumeControl.value;
});

// Auto Play Next Song When Current Song Ends
audio.addEventListener("ended", () => {
    nextBtn.click();
});
