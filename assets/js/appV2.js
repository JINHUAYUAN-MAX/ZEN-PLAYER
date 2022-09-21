const log = console.log.bind(console)

const e = function(selector) {
    let element = document.querySelector(selector)
    if (element === null) {
        let s = `选择器 ${selector} 写错了, 请仔细检查并且复习三种基本的选择器`
        alert(s)
        return null
    } else {
        return element
    }
}

const appendHtml = function(element, html) {
    element.insertAdjacentHTML('beforeend', html)
}

// let songIndex = 0

let playImg = "./assets/images/play.svg";
let pauseImg = "./assets/images/pause.svg";

// record player animation
const circleBig = document.querySelector("#circle-bg");
const circleSm = document.querySelector("#circle-sm");

// playing song
const songName = document.querySelector("#song-name");
const audio = document.querySelector("#audio");
const coverArt = document.querySelector("#cover");
const musicbox = document.querySelector("#musicbox");

const songList = [
    {
        name: "逃跑计划 - 夜空中最亮的星",
        source: "./assets/music/逃跑计划 - 夜空中最亮的星.mp3",
        cover: "./assets/images/chillhop-2.jpg"
    },
    {
        name: "许嵩_雅俗共赏",
        source: "./assets/music/许嵩_雅俗共赏.mp3",
        cover: "./assets/images/chillhop-3.jpg"
    },
    {
        name: "周蕙 - 约定",
        source: "./assets/music/周蕙 - 约定.mp3",
        cover: "./assets/images/chillhop-4.jpg"
    },
    {
        name: "周杰伦-彩虹",
        source: "./assets/music/周杰伦-彩虹.mp3",
        cover: "./assets/images/chillhop.jpg"
    }
];

const insertSongList = () => {
    let musicBox = e('#musicbox')
    for (let i = 0; i < songList.length; i++) {
        let songName = `
        <ul>
        <li>
        <h3 class="track-item">${songList[i].name}</h3>
        </li>
        </ul>
        `
        appendHtml(musicBox, songName)
    }
}

let songIndex = 0;
// preloaded song
loadMusic(songList[songIndex]);

function loadMusic() {
    coverArt.src = songList[songIndex].cover;
    songName.innerText = songList[songIndex].name;
    audio.src = songList[songIndex].source;
}

const playSong = () => {
    let playPause = document.querySelector("#play-stop");
    playPause.src = playImg;
    coverArt.src = songList[songIndex].cover;
    circleBig.classList.add("animate");
    circleSm.classList.add("animate");
    audio.src = songList[songIndex].source;
    audio.play();
}

const pauseSong = () => {
    let playPause = document.querySelector("#play-stop");
    playPause.src = pauseImg;
    circleBig.classList.remove("animate");
    circleSm.classList.remove("animate");
    audio.pause();
}

const bindEventPlayPause = () => {
    let playPause = document.querySelector("#play-stop");
    // let playPause = e('#play-stop')
    let isPlaying = false;

    playPause.addEventListener('click', () => {
        isPlaying = !isPlaying;
        // isPlaying ? pauseSong() : playSong();
        if (isPlaying) {
            playSong()
        } else {
            pauseSong()
        }
    })
}


const bindEventBackward = (audio) => {
    let backward = e('#backward')
    backward.addEventListener('click', function() {
        songIndex = (songList.length + songIndex - 1) % songList.length
        coverArt.src = songList[songIndex].cover
        songName.innerText = songList[songIndex].name
        audio.src = songList[songIndex].source
        audio.play()
    })
}

const bindEventForward = (audio) => {
    let forward = e('#forward')
    forward.addEventListener('click', function() {
        songIndex = (songIndex + 1) % songList.length
        coverArt.src = songList[songIndex].cover
        songName.innerText = songList[songIndex].name
        audio.src = songList[songIndex].source
        audio.play()
    })
}

const bindEvents = function() {
    
    bindEventPlayPause()
    bindEventBackward(audio)
    bindEventForward(audio)
}

const __main = () => {
    insertSongList()
    bindEvents()
}

__main()