import React from 'react'
import Faceexpression from '../../expressions/components/Faceexpression'
import Player from '../components/Player'
import { useSong } from '../hooks/useSong'

const Home = () => {
  const { handlegetSong, loading } = useSong()

  const handleMoodDetection = async (expression) => {
    let mood = 'neutral'

    // Map expressions to moods
    if (expression === 'happy 😊') {
      mood = 'happy'
    } else if (expression === 'sad 😞') {
      mood = 'sad'
    } else if (expression === 'surprised 😮') {
      mood = 'surprised'
    }

    console.log(`Detected mood: ${mood}`)
    await handlegetSong({ mood })
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: 'limegreen' }}>
        Moodify - Music for Your Mood
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Faceexpression onClick={handleMoodDetection} />
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div>Loading songs for your mood...</div>
          </div>
        )}

        <Player />
      </div>
    </div>
  )
}

export default Home