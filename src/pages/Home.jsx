import { useState } from "react";

import { searchSongs } from "../services/spotify";
import Player from "../components/Player";

function Home() {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState([]);
  const [current, setCurrent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isShuffle, setIsShuffle] = useState(false);


  async function handleSearch() {
    const results = await searchSongs(query);
    setTracks(results);
    setCurrentIndex(-1);
    setCurrent(null);
  }

  function handleSelectTrack(track, index) {
    setCurrent(track);
    setCurrentIndex(index);
  }

  function handleNextTrack() {
    if (tracks.length === 0) return;
    let nextIndex;
    if (isShuffle) {
      
      nextIndex = Math.floor(Math.random() * tracks.length);
    } else {
      nextIndex = (currentIndex + 1) % tracks.length;
    }
    setCurrentIndex(nextIndex);
    setCurrent(tracks[nextIndex]);
  }

  function handlePreviousTrack() {
    if (tracks.length === 0) return;
    const prevIndex = currentIndex <= 0 ? tracks.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setCurrent(tracks[prevIndex]);
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Jamendo Player</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for a song or artist..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </header>

      <main className="main-content">
        <div className="track-grid">
          {tracks.map((track, index) => (
            <div
              key={track.id}
              className="track-card"
              onClick={() => handleSelectTrack(track, index)}
            >
              <div className="track-image-container">
                <img src={track.image} alt={track.name} />
              </div>
              <div className="track-info">
                <h3>{track.name}</h3>
                <p>{track.artist_name}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {current && (
        <Player
          track={current}
          onNext={handleNextTrack}
          onPrevious={handlePreviousTrack}
          onShuffleChange={setIsShuffle}
          isShuffle={isShuffle}
          hasNextTrack={currentIndex < tracks.length - 1 || tracks.length > 1}
          hasPreviousTrack={currentIndex > 0 || tracks.length > 1}
        />
      )}
    </div>
  );
}

export default Home;
