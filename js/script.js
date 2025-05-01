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
        .catch(() => {
            document.getElementById("track").textContent = "Offline";
            document.getElementById("artist").textContent = "";
        });
}

document.addEventListener("DOMContentLoaded", () => {
    window.scrollTo(0, 0);
    document.getElementById('enter-screen').addEventListener('click', () => {
        const video = document.getElementById('video-bg');
        const videoFiles = [
            "heaven.mp4",
            "blkkk.mp4",
            "mercy.mp4",
            "paris.mp4",
            "stronger.mp4",
            "franchise.mp4",
            "wokeuplikethis.mp4",
            "teainyohood.mp4",
            "nojumper.mp4",
            "keepitburnin.mp4"
        ];
        const selected = videoFiles[Math.floor(Math.random() * videoFiles.length)];
        
        video.muted = false;
        video.pause();
        video.querySelector("source").src = `videos/${selected}`;
        video.load();

        document.getElementById('enter-screen').style.display = 'none';
        video.style.display = 'block';
        document.querySelector('.content').style.display = 'block';
        document.getElementById('mute').style.display = 'block';

        document.documentElement.classList.add('entered');
        document.body.classList.add('entered');

        video.play().catch((error) => {
            console.error("Playback failed:", error);
        });

        let muteClicksRemaining = 1000;
        document.getElementById('mute-toggle').addEventListener('click', () => {
            if (muteClicksRemaining > 1) {
                muteClicksRemaining--;
                document.getElementById('mute-toggle').textContent = `click this ${muteClicksRemaining} more times to mute the audio`;
            } else {
                const video = document.getElementById('video-bg');
                video.muted = true;
                video.volume = 0;
                document.getElementById('mute-toggle').textContent = "muted. you win.";
            }
        });

        updateListeningInfo();
        setInterval(updateListeningInfo, 5000);

    });
});