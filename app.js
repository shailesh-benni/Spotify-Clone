console.log("Welcome to Spotify");

// Song index
let songIndex = 0;
let audioElement = new Audio('/songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songListContainer = document.getElementById('songListContainer');
let masterSongName = document.getElementById('masterSongName');

let songs = [
    { songName: "Salameryy-epIshq", filePath: "/songs/1.mp3", coverPath: "covers/1.jpg",songDuration:"2:30" },
    { songName: "Salameryrty-epIshq", filePath: "/songs/2.mp3", coverPath: "covers/2.jpg",songDuration:"7:30" },
    { songName: "Salatyrtyme-epIshq", filePath: "/songs/3.mp3", coverPath: "covers/3.jpg" ,songDuration:"2:30"},
    { songName: "Salayryme-epIshq", filePath: "/songs/4.mp3", coverPath: "covers/4.jpg",songDuration:"2:90"},
    { songName: "Salrtyame-epIshq", filePath: "/songs/5.mp3", coverPath: "covers/5.jpg" ,songDuration:"2:30"}
];

// Generate song list dynamically
songs.forEach((song, i) => {
    let songItem = document.createElement('div');
    songItem.classList.add('songItems');
    songItem.innerHTML = `
        <img src="${song.coverPath}" alt="${i}">
        <span class="songName">${song.songName}</span>
        <span class="songListPlay">
            <span class="timeStamp">${song.songDuration} <i id="${i}" class="fa-regular songItemPlay fa-2x fa-circle-play"></i></span>
        </span>
    `;
    songListContainer.appendChild(songItem);
});

// Update song info and controls
const updateSongInfo = () => {
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
};

// Function to update play/pause icons for all elements
const updatePlayPauseIcons = (playingIndex) => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i) => {
        if (i === playingIndex) {
            element.classList.remove('fa-circle-play');
            element.classList.add('fa-circle-pause');
        } else {
            element.classList.add('fa-circle-play');
            element.classList.remove('fa-circle-pause');
        }
    });
    if (audioElement.paused) {
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    } else {
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
};

// Function to reset all play buttons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
    });
};

// Play/Pause functionality for master button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        updatePlayPauseIcons(songIndex);
    } else {
        audioElement.pause();
        updatePlayPauseIcons(-1); // Reset all play buttons to play state
    }
});

// Update seekbar
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Add event listeners to song play buttons
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        let index = parseInt(e.target.id);
        if (index !== songIndex) {
            songIndex = index;
            updateSongInfo();
            audioElement.play();
            updatePlayPauseIcons(songIndex);
        } else {
            if (audioElement.paused) {
                audioElement.play();
                updatePlayPauseIcons(songIndex);
            } else {
                audioElement.pause();
                updatePlayPauseIcons(-1); // Reset all play buttons to play state
            }
        }
    });
});

// Next song
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    updateSongInfo();
    audioElement.play();
    updatePlayPauseIcons(songIndex);
});

// Previous song
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    updateSongInfo();
    audioElement.play();
    updatePlayPauseIcons(songIndex);
});
