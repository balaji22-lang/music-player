import { useState } from "react";

import { searchSongs } from "../services/spotify";
import Player from "../components/Player";

function Home() {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState([]);
  const [current, setCurrent] = useState(null);

  // Note: Jamendo public track API doesn't require an OAuth token, just your client_id!
  // so we can bypass the login check completely.

  async function handleSearch() {
    const results = await searchSongs(query);
    setTracks(results);
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
          {tracks.map((track) => (
            <div
              key={track.id}
              className="track-card"
              onClick={() => setCurrent(track)}
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

      {current && <Player track={current} />}
    </div>
  );
}

export default Home;
