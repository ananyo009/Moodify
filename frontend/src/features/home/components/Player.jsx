import React, { useState, useRef, useEffect } from 'react'
import { useSong } from '../hooks/useSong'
import './Player.scss'

const Player = () => {
    const { songs, currentSong, currentSongIndex, nextSong, prevSong, selectSong } = useSong()
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(0.5)
    const audioRef = useRef(null)

    console.log(songs)

    useEffect(() => {
        if (audioRef.current && currentSong) {
            audioRef.current.src = currentSong.songUrl
            audioRef.current.volume = volume
            if (isPlaying) {
                audioRef.current.play()
            }
        }
    }, [currentSong])

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume
        }
    }, [volume])

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause()
            } else {
                audioRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime)
            setDuration(audioRef.current.duration)
        }
    }

    const handleProgressChange = (e) => {
        if (audioRef.current) {
            const newTime = (e.target.value / 100) * duration
            audioRef.current.currentTime = newTime
            setCurrentTime(newTime)
        }
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    const handleSongEnd = () => {
        nextSong()
    }

    if (!currentSong) {
        return (
            <div className="player-container">
                <div className="no-song">
                    <h3>No song selected</h3>
                    <p>Detect your mood to get personalized songs!</p>
                </div>
            </div>
        )
    }

    return (
        <div className="player-container">
            <div className="player-main">
                <div className="current-song">
                    <img
                        src={currentSong.posterUrl}
                        alt={currentSong.title}
                        className="song-poster"
                    />
                    <div className="song-info">
                        <h3>{currentSong.title}</h3>
                        <p>Mood: {currentSong.mood}</p>
                    </div>
                </div>

                <div className="player-controls">
                    <audio
                        ref={audioRef}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleTimeUpdate}
                        onEnded={handleSongEnd}
                    />

                    <div className="control-buttons">
                        <button onClick={prevSong} disabled={currentSongIndex === 0}>
                            ⏮️
                        </button>
                        <button onClick={togglePlayPause} className="play-pause">
                            {isPlaying ? '⏸️' : '▶️'}
                        </button>
                        <button onClick={nextSong} disabled={currentSongIndex === songs.length - 1}>
                            ⏭️
                        </button>
                    </div>

                    <div className="progress-container">
                        <span className="time">{formatTime(currentTime)}</span>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={duration ? (currentTime / duration) * 100 : 0}
                            onChange={handleProgressChange}
                            className="progress-bar"
                        />
                        <span className="time">{formatTime(duration)}</span>
                    </div>

                    <div className="volume-container">
                        <span className="volume-icon">🔊</span>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="volume-bar"
                        />
                        <span className="volume-level">{Math.round(volume * 100)}%</span>
                    </div>
                </div>
            </div>

            <div className="playlist">
                <h4>Playlist ({songs.length} songs)</h4>
                <div className="playlist-songs">
                    {songs.map((song, index) => (
                        <div
                            key={index}
                            className={`playlist-item ${index === currentSongIndex ? 'active' : ''}`}
                            onClick={() => selectSong(index)}
                        >
                            <img
                                src={song.posterUrl}
                                alt={song.title}
                                className="playlist-poster"
                            />
                            <div className="playlist-song-info">
                                <span className="playlist-title">{song.title}</span>
                                <span className="playlist-mood">{song.mood}</span>
                            </div>
                            {index === currentSongIndex && isPlaying && (
                                <div className="now-playing">🎵</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Player
