document.getElementById('enter-screen').addEventListener('click', () => {
    document.getElementById('enter-screen').style.display = 'none';
    document.getElementById('video-bg').style.display = 'block';
    document.querySelector('.content').style.display = 'block';

    const video = document.getElementById('video-bg');
    video.muted = false;
    video.play();
  });