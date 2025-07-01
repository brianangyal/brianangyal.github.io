let currentPage = 1;
let seenTimestamps = new Set();
let nowPlayingTrackId = null;

const container = document.getElementById("history-list");

function getTrackId(item) {
    
    if (item.nowPlaying) {
        return `np-${item.artist} - ${item.track}`;  
    }  

    return `sc-${item.timestamp}`;
}

function renderTrack(item, prepend = false) {
    const isNowPlaying = item.nowPlaying;
    const trackId = getTrackId(item);

    if (seenTimestamps.has(trackId)) {

      if (isNowPlaying && nowPlayingTrackId === trackId) {

          const existingElement = document.querySelector(`[data-track-id="${trackId}"]`);
          if (existingElement && existingElement !== container.firstChild) {

              container.insertBefore(existingElement, container.firstChild);
          }
      }
      return;

    }

    seenTimestamps.add(trackId);

    const entry = document.createElement("div");

    entry.dataset.trackId = trackId;
    if (isNowPlaying) {
        entry.classList.add("now-playing");
    }

    if (item.image) {
        const img = document.createElement("img");
        img.src = item.image;
        img.alt = "Album Art";
        img.classList.add("track-image");
        entry.appendChild(img);
    }

    const textBlock = document.createElement("div");

    const trackLink = document.createElement("a");
    trackLink.href = `https://www.last.fm/music/${encodeURIComponent(item.artist)}/_/${encodeURIComponent(item.track)}`;
    trackLink.target = "_blank";
    trackLink.textContent = `${item.track} — ${item.artist}`;


    const time = document.createElement("small");

    if (isNowPlaying) {
        time.textContent = "Now playing ";
        const bars = document.createElement("span");
        bars.classList.add("inline-bars");

        for (let i = 0; i < 3; i++) {
            const bar = document.createElement("span");
            bar.classList.add("inline-bar");
            bars.appendChild(bar);
        }

        time.appendChild(bars);
    } else {
        time.textContent = new Date(item.timestamp * 1000).toLocaleString();
    }

    textBlock.appendChild(trackLink);
    textBlock.appendChild(time);
    entry.appendChild(textBlock);

    if (isNowPlaying) {
        container.insertBefore(entry, container.firstChild);
    } else if (prepend) {
        let insertBefore = container.firstChild;
        if (nowPlayingTrackId) {
            const nowPlayingElement = document.querySelector(`[data-track-id="${nowPlayingTrackId}"]`);
            if (nowPlayingElement) {
              insertBefore = nowPlayingElement.nextSibling;
            }
        }
        container.insertBefore(entry, insertBefore);
    } else {
        container.appendChild(entry);
    }

    if (isNowPlaying) {
        nowPlayingTrackId = trackId;
    }
}

function fetchNewTracks() {
  fetch("https://lastfm-white-snow-97b9.brianbs297.workers.dev/history?page=1")
    .then(res => res.json())
    .then(data => {
      if (!data || data.length === 0) {

        if (nowPlayingTrackId) {
          const oldNowPlaying = document.querySelector(`[data-track-id="${nowPlayingTrackId}"]`);
          if (oldNowPlaying) oldNowPlaying.remove();
          seenTimestamps.delete(nowPlayingTrackId);
          nowPlayingTrackId = null;
        }
        return;
      }

      const nowPlaying = data.find(t => t.nowPlaying);

      if (nowPlaying) {

        const newId = getTrackId(nowPlaying);

        if (nowPlayingTrackId && nowPlayingTrackId !== newId) {

          const old = document.querySelector(`[data-track-id="${nowPlayingTrackId}"]`);
          if (old) old.remove();
          seenTimestamps.delete(nowPlayingTrackId);
        }

        renderTrack(nowPlaying, true);
        nowPlayingTrackId = newId;
      } else if (nowPlayingTrackId) {

        const old = document.querySelector(`[data-track-id="${nowPlayingTrackId}"]`);
        if (old) old.remove();
        seenTimestamps.delete(nowPlayingTrackId);
        nowPlayingTrackId = null;
      }

      const scrobbled = data
        .filter(t => !t.nowPlaying && t.timestamp)
        .sort((a, b) => b.timestamp - a.timestamp);

      scrobbled.forEach(item => renderTrack(item, true));
    })
    .catch(console.error);
}

function fetchOlderTracks() {
  currentPage++;
  return fetch(`https://lastfm-white-snow-97b9.brianbs297.workers.dev/history?page=${currentPage}`)
    .then(res => res.json())
    .then(data => {
      data
        .sort((a, b) => a.timestamp - b.timestamp)
        .forEach(item => renderTrack(item, false));
    })
    .catch(console.error);
}

fetchNewTracks();

let isFetching = false;

container.addEventListener("scroll", () => {
  const threshold = 50;
  const scrollBottom = container.scrollHeight - container.scrollTop - container.clientHeight;

  if (scrollBottom < threshold && !isFetching) {
    isFetching = true;
    fetchOlderTracks().then(() => {
      isFetching = false;
    });
  }
});

setInterval(fetchNewTracks, 10000);
