document.getElementById('enter-screen').addEventListener('click', () => {
    const video = document.getElementById('video-bg');
    const videoFiles = [
        "heaven.mp4",
        "blkkk.mp4",
        "mercy.mp4",
        "paris.mp4",
        "stronger.mp4",
        "evangelion_one.mp4",
        "evangelion_two.mp4"
    ];
    const selected = videoFiles[Math.floor(Math.random() * videoFiles.length)];
    
    video.muted = false;
    video.querySelector("source").src = `videos/${selected}`;
    video.load();

    document.getElementById('enter-screen').style.display = 'none';
    video.style.display = 'block';
    document.querySelector('.content').style.display = 'block';
    document.getElementById('mute-btn').style.display = 'block';

    video.play().catch((error) => {
        console.error("Playback failed:", error);
    });

    document.getElementById('mute-toggle').addEventListener('click', () => {
        alert("no lol.");
    });

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
});

