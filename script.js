const audioPlayer = document.querySelector('.audio-player-1');
const audio = new Audio(
    'https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3'
);

console.dir(audio);
console.log(audioPlayer);

audio.addEventListener(
    'loadeddata',
    () => {
        audioPlayer.querySelector('.time .length').textContent =
            getTimeCodeFromNum(audio.duration);
        audio.volume = 1.0;
    },
    false
);

//click on timeline to skip around
const timeline = audioPlayer.querySelector('.timeline');
timeline.addEventListener(
    'click',
    (e) => {
        const timelineWidth = window.getComputedStyle(timeline).width;
        const timeToSeek =
            (e.offsetX / parseInt(timelineWidth)) * audio.duration;
        audio.currentTime = timeToSeek;
    },
    false
);

//check audio percentage and update time accordingly
setInterval(() => {
    const progressBar = audioPlayer.querySelector('.progress');
    progressBar.style.width = (audio.currentTime / audio.duration) * 100 + '%';
    audioPlayer.querySelector('.time .current').textContent =
        getTimeCodeFromNum(audio.currentTime);
}, 500);

//toggle between playing and pausing on button click
const playBtn = audioPlayer.querySelector('.controls .toggle-play');
playBtn.addEventListener(
    'click',
    () => {
        if (audio.paused) {
            playBtn.classList.remove('play');
            playBtn.classList.add('pause');
            audio.play();
        } else {
            playBtn.classList.remove('pause');
            playBtn.classList.add('play');
            audio.pause();
        }
    },
    false
);

//turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
        seconds % 60
    ).padStart(2, 0)}`;
}
