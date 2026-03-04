import { useRef } from "react";

function Player({ track }) {
  const audioRef = useRef();

  if (!track) return null;

  return (
    <div className="player-container">
      <div className="player-content">
        <div className="player-track-info">
          <img src={track.image} alt={track.name} className="player-image" />
          <div className="player-text">
            <h4>{track.name}</h4>
            <p>{track.artist_name}</p>
          </div>
        </div>

        <div className="player-controls">
          <audio
            ref={audioRef}
            controls
            src={track.audio}
            autoPlay
            className="audio-element"
          />
        </div>
      </div>
    </div>
  );
}

export default Player;
