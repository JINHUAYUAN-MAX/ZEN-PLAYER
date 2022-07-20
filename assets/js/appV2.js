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

const songList = [
    {
        name: "李健 - 贝加尔湖畔",
        source: "./assets/music/李健 - 贝加尔湖畔.mp3",
        cover: "./assets/images/chillhop.jpg"
    },
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
        cover: "./assets/images/chillhop-2.jpg"
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

let playImg = "./assets/images/play.svg";
let pauseImg = "./assets/images/pause.svg";

// record player animation
const circleBig = document.querySelector("#circle-bg");
const circleSm = document.querySelector("#circle-sm");

const playSong = () => {
    let playPause = document.querySelector("#play-stop");
    playPause.src = playImg;
    coverArt.src = songList[index].cover;
    circleBig.classList.add("animate");
    circleSm.classList.add("animate");
    audio.src = songList[index].source
    audio.play();
}

const pauseSong = (audio) => {
    let playPause = document.querySelector("#play-stop");
    playPause.src = pauseImg;
    circleBig.classList.remove("animate");
    circleSm.classList.remove("animate");
    audio.pause();
}

const bindEventPlayPause = (audio) => {
    let playPause = e('#play-stop')
    let isPlaying = false;

    playPause.addEventListener('click', (audio) => {
        isPlaying = !isPlaying;
        isPlaying ? playSong(audio) : pauseSong(audio);
    })
}

let index = 0
const bindEventBackward = (audio) => {
    let backward = e('#backward')
    backward.addEventListener('click', function() {
        index = (songList.length + index - 1) % songList.length
        audio.src = songList[index].source
        audio.play()
    })
}

const bindEventForward = (audio) => {
    let forward = e('#forward')
    forward.addEventListener('click', function() {
        index = (index + 1) % songList.length
        audio.src = songList[index].source
        audio.play()
    })
}

const bindEvents = function() {
    let audio = e('#audio')
    bindEventPlayPause(audio)
    bindEventBackward(audio)
    bindEventForward(audio)
}

const __main = () => {
    insertSongList()
    bindEvents()
}

__main()