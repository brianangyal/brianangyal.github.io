document.getElementById('enter-screen').addEventListener('click', () => {
    const video = document.getElementById('video-bg');
    const videoFiles = [
        "heaven.mp4",
        "blkkk.mp4"
    ];
    const selected = videoFiles[Math.floor(Math.random() * videoFiles.length)];
    
    video.muted = false;
    video.querySelector("source").src = `videos/${selected}`;
    video.load();

    document.getElementById('enter-screen').style.display = 'none';
    video.style.display = 'block';
    document.querySelector('.content').style.display = 'block';

    video.play().catch((error) => {
        console.error("Playback failed:", error);
    });
});