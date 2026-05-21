const songs = [

  {
    title:"Dreams",
    artist:"Artist One",
    src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover:"https://picsum.photos/id/1015/400/300"
  },

  {
    title:"Sunset",
    artist:"Artist Two",
    src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover:"https://picsum.photos/id/1016/400/300"
  },

  {
    title:"Ocean Waves",
    artist:"Artist Three",
    src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover:"https://picsum.photos/id/1018/400/300"
  }

];

const audio =
  document.getElementById("audio");

const title =
  document.getElementById("title");

const artist =
  document.getElementById("artist");

const cover =
  document.getElementById("cover");

const playBtn =
  document.getElementById("play");

const prevBtn =
  document.getElementById("prev");

const nextBtn =
  document.getElementById("next");

const progress =
  document.getElementById("progress");

const progressContainer =
  document.getElementById("progress-container");

const currentTimeEl =
  document.getElementById("current-time");

const durationEl =
  document.getElementById("duration");

const volumeSlider =
  document.getElementById("volume");

const playlistEl =
  document.getElementById("playlist");

let songIndex = 0;
let isPlaying = false;

function loadSong(index){

  const song = songs[index];

  title.textContent = song.title;
  artist.textContent = song.artist;

  audio.src = song.src;
  cover.src = song.cover;

  updatePlaylist();
}

loadSong(songIndex);

function playSong(){

  isPlaying = true;

  audio.play();

  playBtn.textContent = "⏸";
}

function pauseSong(){

  isPlaying = false;

  audio.pause();

  playBtn.textContent = "▶";
}

playBtn.addEventListener("click", () => {

  if(isPlaying){
    pauseSong();
  }

  else{
    playSong();
  }

});
function nextSong(){

  songIndex++;

  if(songIndex > songs.length - 1){
    songIndex = 0;
  }

  loadSong(songIndex);

  playSong();
}

function prevSong(){

  songIndex--;

  if(songIndex < 0){
    songIndex = songs.length - 1;
  }

  loadSong(songIndex);

  playSong();
}

nextBtn.addEventListener("click", nextSong);

prevBtn.addEventListener("click", prevSong);

audio.addEventListener("timeupdate", (e) => {

  const {duration, currentTime} = e.srcElement;

  const progressPercent =
    (currentTime / duration) * 100;

  progress.style.width = `${progressPercent}%`;

  let currentMinutes =
    Math.floor(currentTime / 60);

  let currentSeconds =
    Math.floor(currentTime % 60);

  if(currentSeconds < 10){
    currentSeconds = `0${currentSeconds}`;
  }

  currentTimeEl.textContent =
    `${currentMinutes}:${currentSeconds}`;

  let durationMinutes =
    Math.floor(duration / 60);

  let durationSeconds =
    Math.floor(duration % 60);

  if(durationSeconds < 10){
    durationSeconds = `0${durationSeconds}`;
  }

  if(durationSeconds){

    durationEl.textContent =
      `${durationMinutes}:${durationSeconds}`;
  }

});

progressContainer.addEventListener("click", (e) => {

  const width =
    progressContainer.clientWidth;

  const clickX = e.offsetX;

  const duration = audio.duration;

  audio.currentTime =
    (clickX / width) * duration;

});

volumeSlider.addEventListener("input", (e) => {

  audio.volume = e.target.value;

});

audio.addEventListener("ended", nextSong);

function updatePlaylist(){

  playlistEl.innerHTML = "";

  songs.forEach((song, index) => {

    const li =
      document.createElement("li");

    li.textContent =
      `${song.title} - ${song.artist}`;

    if(index === songIndex){
      li.classList.add("active");
    }

    li.addEventListener("click", () => {

      songIndex = index;

      loadSong(songIndex);

      playSong();

    });

    playlistEl.appendChild(li);

  });

}

document.addEventListener("keydown", (e) => {

  if(e.code === "Space"){

    e.preventDefault();

    if(isPlaying){
      pauseSong();
    }

    else{
      playSong();
    }
  }

  else if(e.key === "ArrowRight"){
    nextSong();
  }

  else if(e.key === "ArrowLeft"){
    prevSong();
  }

});