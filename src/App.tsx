// const tracks = null;

import { useEffect, useState } from "react"



function App() {

  const [selectedTrackId, setSelectedTrackId] = useState(null)
  const [selectedTrack, setSelectedTrack] = useState(null)
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

// if (selectedTrack === null) {
//     return <h3>Загрузка...</h3>
//   }

  return (
    <>
      <div className="main">
        <div>
          <button onClick={() => { setSelectedTrackId(null)
            setSelectedTrack(null)}}>Сбросить активный трек</button>
          {tracks.map((track) => {
            return (
              <div key={track.id} onClick={() => {
                setSelectedTrackId(track.id)

                fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks/' + track.id, {
                  headers: {
                    'api-key': 'f505adfb-198d-4a0b-9393-d8b33245ba6f'
                  }
                }).then(res => res.json())
                  .then(json => setSelectedTrack(json.data))

              }} style={{ maxWidth: "500px", border: track.id === selectedTrackId ? '2px solid red' : 'none' }}>


                
                <h3>{track.attributes.title}</h3>
                <audio src={track.attributes.attachments[0].url} controls></audio>
              </div>
            )
          })}
        </div>
        <div>
          <h1>Выбранный трек</h1>

          

          <h3>{selectedTrack === null ? 'Трек не вывбран' : selectedTrack.attributes.title}</h3>
          
          <p>
            {selectedTrack.attributes.lyrics ?? 'У этой песни нет текста'}
            </p>

        </div>

      </div>

    </>
  )
}

export default App
