function updateListeningInfo() {
    fetch("https://lastfm-white-snow-97b9.brianbs297.workers.dev")
        .then(res => res.json())
        .then(data => {
            document.getElementById("track").textContent = data.track;
            document.getElementById("artist").textContent = data.artist;

            const art = document.getElementById("album-art");
            if (data.image) {
                art.src = data.image;
                art.style.display = "block";
            } else {
                art.style.display = "none";
            }
        })
}

window.addEventListener("load", () => {
    window.scrollTo(0, 0);
});

document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById('video-bg');
    const videoFiles = [
        "heaven.mp4",
        "blkkk.mp4",
        "mercy.mp4",
        "paris.mp4",
        "keepup.mp4",
        "franchise.mp4",
        "pokerface.mp4",
        "keepitburnin.mp4",
        "pissonyourgrave.mp4",
        "allday.mp4",
        "onlyone.mp4"
    ];
    let currentIndex = Math.floor(Math.random() * videoFiles.length);

    function playNextVideo() {
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * videoFiles.length);
        } while (nextIndex === currentIndex);

        currentIndex = nextIndex;
        video.querySelector("source").src = `videos/${videoFiles[currentIndex]}`;
        video.load();
        video.play().catch(console.error);
    }

    document.getElementById('enter-screen').addEventListener('click', () => {
        video.loop = false;
        video.muted = false;
        video.pause();
        video.querySelector("source").src = `videos/${videoFiles[currentIndex]}`;
        video.load();

        document.getElementById('enter-screen').style.display = 'none';
        video.style.display = 'block';
        document.querySelector('.content').style.display = 'block';

        document.getElementById('mute').style.display = 'block';
        document.title = "hehe.";
        document.documentElement.classList.add('entered');
        document.body.classList.add('entered');

        updateListeningInfo();
        setInterval(updateListeningInfo, 5000);

        video.play().catch((error) => {
            console.error("Playback failed:", error);
        });

        video.addEventListener("ended", playNextVideo);

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
});