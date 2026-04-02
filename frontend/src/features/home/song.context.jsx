import { createContext, useState } from "react";

export const songContext = createContext();

export const SongProvider = ({ children }) => {
    
    const [songs, setsongs] = useState([])
    const [currentSongIndex, setCurrentSongIndex] = useState(0)
    const [loading, setloading] = useState(false)

    const currentSong = songs[currentSongIndex] || null

    return (
        <songContext.Provider value={{
            songs, 
            setsongs, 
            currentSongIndex, 
            setCurrentSongIndex,
            currentSong,
            loading, 
            setloading
        }}>
            {children}
        </songContext.Provider>
    )


}