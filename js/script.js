const video = document.getElementById('video-bg');
const backgroundVideoFiles = [
    "keepitburnin.webm"
];
/*const backgroundVideoFiles = [
    "heaven.webm",
    "blkkk.webm",
    "mercy.webm",
    "paris.webm",
    "onlyone.webm",
    "eazy.webm",
    "keepitburnin.webm",
    "allday.webm",
    "godstest.webm"
];*/
let currentIndex = Math.floor(Math.random() * backgroundVideoFiles.length);

const enterBackgrounds = [
    'backgrounds/burnin.gif',
    'backgrounds/eazy.gif',
    'backgrounds/mercy.gif',
    'backgrounds/canttellmenothin.gif',
    'backgrounds/runaway.gif',
    'backgrounds/swish.gif',
    'backgrounds/yeezus.gif',
    'backgrounds/stronger.gif'
];
const selectedBackground = enterBackgrounds[Math.floor(Math.random() * enterBackgrounds.length)];
document.getElementById('enter-screen').style.backgroundImage = `url('${selectedBackground}')`;

function updateListeningInfo() {
    fetch("https://lastfm-white-snow-97b9.brianbs297.workers.dev")
        .then(res => res.json())
        .then(data => {
            document.getElementById("track").textContent = data.track;
            document.getElementById("artist").textContent = data.artist;
            document.getElementById("last-fm-link").href = "https://www.last.fm/music/" + data.artist.replace(/\+/g, '%252B').replace(/\//g, '%2F').replace(/ /g, '+').replace(/\[/g, '%5B').replace(/\]/g, '%5D') + "/_/" + data.track.replace(/\+/g, '%252B').replace(/\//g, '%2F').replace(/ /g, '+').replace(/\[/g, '%5B').replace(/\]/g, '%5D');
            
            const art = document.getElementById("album-art");
            if (data.image) {
                art.src = data.image;
                art.style.display = "block";
            } else {
                art.style.display = "none";
            }
        });
}

function playNextVideo() {
    let nextIndex;
    do {
        nextIndex = Math.floor(Math.random() * backgroundVideoFiles.length);
    } while (nextIndex === currentIndex);

    currentIndex = nextIndex;
    video.querySelector("source").src = `videos/${backgroundVideoFiles[currentIndex]}`;
    video.load();
    video.play().catch(console.error);
}

function getLyrics(titleInterval, lyrics) {
    return setInterval(() => {
        const current = video.currentTime;
        const line = lyrics.find(l => current >= l.start && current < l.end);
        if (line) {
            document.title = line.text;
        }
    }, 200);
}

document.getElementById('enter-screen').addEventListener('click', () => {
    const sourceElement = video.querySelector("source");
    const newSrc = `videos/${backgroundVideoFiles[currentIndex]}`;
    if (!sourceElement.src.endsWith(newSrc)) {
        sourceElement.src = newSrc;
        video.load();
    }

    document.getElementById('enter-screen').style.display = 'none';
    video.style.display = 'block';
    document.querySelector('.content').style.display = 'block';

    document.getElementById('mute').style.display = 'block';

    document.documentElement.classList.add('entered');
    document.body.classList.add('entered');

    updateListeningInfo();
    setInterval(updateListeningInfo, 5000);

    video.play().catch((error) => {
        console.error("Playback failed:", error);
    });

    fetch(`videos/lyrics/${backgroundVideoFiles[currentIndex].replace('.webm', '.json')}`)
        .then(res => {
            if (!res.ok) throw new Error("No lyrics found");
            return res.json();
        })
        .then(lyrics => {
            const titleInterval = getLyrics(null, lyrics);
            video.addEventListener("ended", () => {
                clearInterval(titleInterval);
                document.title = ".";
                playNextVideo();
            });
        })
        .catch(() => {
            console.log("No lyrics found for this video.");
            document.title = ".";
            video.addEventListener("ended", playNextVideo);
        });

    const muteToggle = document.getElementById('mute-toggle');
    if (muteToggle) {
        muteToggle.addEventListener('click', () => {
            video.muted = !video.muted;
            muteToggle.innerText = video.muted
                ? 'unmute music'
                : 'mute music';
        });
    }
});


