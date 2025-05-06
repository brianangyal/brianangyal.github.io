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

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('enter-screen').addEventListener('click', () => {
        const video = document.getElementById('video-bg');
        const videoFiles = [
            "heaven.mp4",
            "blkkk.mp4",
            "mercy.mp4",
            "paris.mp4",
            "stronger.mp4",
            "franchise.mp4",
            "teainyohood.mp4",
            "nojumper.mp4",
            "keepitburnin.mp4",
            "pissonyourgrave.mp4",
            "ifeellikethat.mp4"
        ];
        const selected = videoFiles[Math.floor(Math.random() * videoFiles.length)];
        
        video.muted = false;
        video.pause();
        video.querySelector("source").src = `videos/${selected}`;
        video.load();

        document.getElementById('enter-screen').style.display = 'none';
        video.style.display = 'block';
        document.querySelector('.content').style.display = 'block';
        if (selected !== "ifeellikethat.mp4") {
            document.getElementById('mute').style.display = 'block';
            document.title = "hello.";
            document.documentElement.classList.add('entered');
            document.body.classList.add('entered');
            updateListeningInfo();
            setInterval(updateListeningInfo, 15000);
        } else {
            document.querySelectorAll('body > *:not(#video-bg)').forEach(el => el.remove());
            document.title = '';
            document.documentElement.classList.add('entered');
            document.body.classList.add('entered');
        }

        video.play().catch((error) => {
            console.error("Playback failed:", error);
        });

        const muteToggle = document.getElementById('mute-toggle');
        if (selected !== "ifeellikethat.mp4" && muteToggle) {
            muteToggle.addEventListener('click', () => {
                video.muted = !video.muted;
                muteToggle.innerText = video.muted ? 'click me to unmute music' : 'click me to mute music';
            });
        }
    });
});