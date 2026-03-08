import { useRef, useState } from "react";

function Player({ track, onNext, onPrevious, onShuffleChange, isShuffle, hasNextTrack, hasPreviousTrack }) {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLooping, setIsLooping] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  if (!track) return null;

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
    if (audioRef.current) {
      audioRef.current.loop = !isLooping;
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current?.currentTime || 0);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current?.duration || 0);
  };

  const handleEnded = () => {
    if (!isLooping && onNext) {
      onNext();
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

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

        <audio
          ref={audioRef}
          src={track.audio}
          autoPlay
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        />

        <div className="player-progress">
          <span className="time">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            className="progress-bar"
          />
          <span className="time">{formatTime(duration)}</span>
        </div>

        <div className="player-controls">
          <button
            className={`control-btn shuffle-btn ${isShuffle ? "active" : ""}`}
            onClick={() => onShuffleChange(!isShuffle)}
            title="Shuffle"
          >
            <img src="/shuffle.png" alt="Shuffle" className="btn-icon" />
          </button>
          <button
            className="control-btn prev-btn"
            onClick={onPrevious}
            disabled={!hasPreviousTrack}
            title="Previous"
          >
            <img src="/previous.png" alt="Previous" className="btn-icon" />
          </button>
          <button
            className="control-btn play-btn"
            onClick={togglePlay}
            title={isPlaying ? "Pause" : "Play"}
          >
            <img 
              src={isPlaying ? "/pause.png" : "/play-button-arrowhead.png"} 
              alt={isPlaying ? "Pause" : "Play"} 
              className="btn-icon play-icon" 
            />
          </button>
          <button
            className="control-btn next-btn"
            onClick={onNext}
            disabled={!hasNextTrack}
            title="Next"
          >
            <img src="/next-button.png" alt="Next" className="btn-icon" />
          </button>
          <button
            className={`control-btn loop-btn ${isLooping ? "active" : ""}`}
            onClick={toggleLoop}
            title="Loop"
          >
            <img src="/loop.png" alt="Loop" className="btn-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Player;
