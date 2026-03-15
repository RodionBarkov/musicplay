// const tracks = null;

import { useEffect, useState } from "react"



function App() {

  const [selectedTrackId, setSelectedTrackId] = useState(null)
  const [tracks, setTracks] = useState(null)

  useEffect(() => {

    fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks', {
      headers: {
        'api-key': 'f505adfb-198d-4a0b-9393-d8b33245ba6f'
      }
    }).then(res => res.json())
      .then(json => setTracks(json.data))
  }, [])


    if (tracks === null) {
    return <h3>Загрузка...</h3>
  }

  if (tracks.length === 0) {
    return <h3>Нет доступных треков</h3>
  }

  return (
    <>
      <button onClick={() => { setSelectedTrackId(null) }}>Сбросить активный трек</button>
      {tracks.map((track) => {
        return (
          <div key={track.id} onClick={() => {
            setSelectedTrackId(track.id)
          }} style={{ border: track.id === selectedTrackId ? '2px solid red' : 'none' }}>
            <h1>{track.attributes.title}</h1>
            <audio src={track.attributes.attachments[0].url} controls></audio>
          </div>
        )
      })}
    </>
  )
}

export default App
