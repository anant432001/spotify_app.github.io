console.log("Welcome to Spotify");

// Initialize the variables
let songIndex = 1;
let audioElement = new Audio(`./utils/songs/${songIndex}.mp3`);
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songInfo = document.getElementById('songInfoText');
let songs = [
    {songName : "The Last of Us : Main Theme", filePath : './utils/songs/1.mp3', coverPath: './utils/covers/1.jpg'},
    {songName : "Loki : Main Theme", filePath : './utils/songs/2.mp3', coverPath: './utils/covers/2.jpg'},
    {songName : "Doctor Strange : Main Theme", filePath : './utils/songs/3.mp3', coverPath: './utils/covers/3.jpg'},
    {songName : "The Last Mohicans : Main Theme", filePath : './utils/songs/4.mp3', coverPath: './utils/covers/4.jpg'},
    {songName : "The Knight : Main Theme", filePath : './utils/songs/5.mp3', coverPath: './utils/covers/5.jpg'},
    {songName : "The Eagle : Main Theme", filePath : './utils/songs/6.mp3', coverPath: './utils/covers/6.jpg'}
];
songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
songInfo.textContent = songs[songIndex-1].songName;

// Handle Play/Pause
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.add('fa-play-circle');
        masterPlay.classList.remove('fa-pause-circle');
        gif.style.opacity = 0;
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    console.log("Time Update");
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songsItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    })
    
}

Array.from(document.getElementsByClassName('songsItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        element.classList.add('fa-pause-circle');
        element.classList.remove('fa-play-circle');
        audioElement.src = `./utils/songs/${songIndex}.mp3`;
        songInfo.textContent = songs[songIndex-1].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex == 6)
        songIndex = 1;
    else songIndex += 1;
    audioElement.src = `./utils/songs/${songIndex}.mp3`;
    songInfo.textContent = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    // 
    makeAllPlays();
    gif.style.opacity = 1;
    document.getElementById(songIndex).classList.add('fa-pause-circle');
    document.getElementById(songIndex).classList.remove('fa-play-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex == 1)
        songIndex = 6;
    else songIndex -= 1;
    audioElement.src = `./utils/songs/${songIndex}.mp3`;
    songInfo.textContent = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    // 
    makeAllPlays();
    gif.style.opacity = 1;
    document.getElementById(songIndex).classList.add('fa-pause-circle');
    document.getElementById(songIndex).classList.remove('fa-play-circle');
})