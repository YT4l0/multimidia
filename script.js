const songs = [
  {
    title: "Still D.R.E.",
    artist: "Dr. Dre ft. Snoop Dogg",
    cover: "src/still.jpeg", 
    src: "src/still-dre.mp3"     
  },
  {
    title: "Love Yourself",
    artist: "Justin Bieber",
    cover: "src/love.jpeg", 
    src: "src/Love-yourself.mp3"      
  }
];

let currentSong = 0;


const audioPlayer = document.getElementById("audio-player"); 
const albumCover = document.getElementById("album-cover");
const songTitle = document.getElementById("song-title"); 
const artist = document.getElementById("artist");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

// Carregar música
function loadSong(songIndex) {
  const song = songs[songIndex];
  songTitle.textContent = song.title;
  artist.textContent = song.artist;
  albumCover.src = song.cover;
  audioPlayer.src = song.src;
}

// Play / Pause
function playPause() {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playBtn.textContent = "⏸"; // pause
  } else {
    audioPlayer.pause();
    playBtn.textContent = "▶"; // play
  }
}

// Próxima música
function nextSong() {
  currentSong = (currentSong + 1) % songs.length; // loop
  loadSong(currentSong);
  audioPlayer.play();
  playBtn.textContent = "⏸";
}

// Música anterior
function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length; // loop
  loadSong(currentSong);
  audioPlayer.play();
  playBtn.textContent = "⏸";
}

// Atualizar tempo e barra
audioPlayer.addEventListener("timeupdate", () => {
  // Garante que a duração é um número válido antes de usar
  if (audioPlayer.duration) {
    progress.max = audioPlayer.duration;
    progress.value = audioPlayer.currentTime;
    durationEl.textContent = formatTime(audioPlayer.duration);
  }
  currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
});

// Mover música arrastando a barra
progress.addEventListener("input", () => {
  audioPlayer.currentTime = progress.value;
});

// Formatar tempo em mm:ss
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// Eventos
playBtn.addEventListener("click", playPause);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
audioPlayer.addEventListener("ended", nextSong); // Toca a próxima música quando a atual termina

// Carregar a primeira música ao iniciar
loadSong(currentSong);