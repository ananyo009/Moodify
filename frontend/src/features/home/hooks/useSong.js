import { getSongs } from "../services/home.services";
import { useContext } from "react";
import { songContext } from "../song.context";

export const useSong = () => {
    const context = useContext(songContext)
    const { songs, setsongs, currentSongIndex, setCurrentSongIndex, currentSong, loading, setloading } = context;

    async function handlegetSong({ mood }) {
        setloading(true)
        const response = await getSongs({ mood });
        setsongs(response.song)
        setCurrentSongIndex(0) // Reset to first song
        setloading(false)
    }

    const nextSong = () => {
        if (currentSongIndex < songs.length - 1) {
            setCurrentSongIndex(currentSongIndex + 1)
        }
    }

    const prevSong = () => {
        if (currentSongIndex > 0) {
            setCurrentSongIndex(currentSongIndex - 1)
        }
    }

    const selectSong = (index) => {
        if (index >= 0 && index < songs.length) {
            setCurrentSongIndex(index)
        }
    }
    
    return ({
        loading, 
        songs, 
        currentSong, 
        currentSongIndex,
        handlegetSong, 
        nextSong, 
        prevSong, 
        selectSong
    })
}