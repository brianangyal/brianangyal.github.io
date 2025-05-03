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
    document.getElementById('enter-screen').addEventListener('click', () => {
        const video = document.getElementById('video-bg');
        updateListeningInfo();
        setInterval(updateListeningInfo, 15000);
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
            "myheart.mp4"
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
        document.title = "hi";

        video.play().catch((error) => {
            console.error("Playback failed:", error);
        });

        document.getElementById('mute-toggle').addEventListener('click', () => {
            const confirmMute = confirm("Are you sure you wanna do this?");
            if (confirmMute) {

                document.title = "YEEZY SEASON APPROACHIN'";
                document.body.style.cursor = "none";

                document.body.innerHTML = `
                    <img src="img/kanye.jpg" id="kanye-img"
                        style="position:fixed;top:0;left:0;width:100vw;height:100vh;object-fit:cover;z-index:9999;">
                    <audio autoplay loop>
                        <source src="videos/onsight.mp3" type="audio/mp3">
                    </audio>`;
        
            } else {
                document.title = "good choice";
            }
        });
    });
});