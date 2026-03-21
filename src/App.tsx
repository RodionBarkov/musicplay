import { useEffect, useState } from "react"
import "./style.css"


const API_BASE_URL = "http://127.0.0.1:8000"

const joinUrl = (base: string, ...parts: Array<string | number>) => {
  const normalizedBase = base.replace(/\/+$/, "")
  const normalizedParts = parts
    .filter((part) => part !== undefined && part !== null && part !== "")
    .map((part) => String(part).replace(/^\/+|\/+$/g, ""))

  return [normalizedBase, ...normalizedParts].join("/")
}

const FALLBACK_COVER = joinUrl(API_BASE_URL, "data/noimage.png")


function App() {

  const [selectedTrackId, setSelectedTrackId] = useState(null)
  const [selectedTrack, setSelectedTrack] = useState(null)
  const [tracks, setTracks] = useState(null)

  useEffect(() => {

    fetch(joinUrl(API_BASE_URL, "tracks"), {
      // headers: {
      //   'api-key': 'f505adfb-198d-4a0b-9393-d8b33245ba6f'
      // }
    }).then(res => res.json())
      .then(json => setTracks(json))
  }, [])


  if (tracks === null) {
    return <h3>Загрузка...</h3>
  }

  if (tracks.length === 0) {
    return <h3>Нет доступных треков</h3>
  }

  return (
    <>
      <div className="global">
        <h1>Выберете песню </h1>
        <div className="tracks">

          {tracks.map((track) => {
            return (
              // <div style="background-image: url({joinUrl(API_BASE_URL, track.cover_url)}), width: 300px, height: 300px">
              <div key={track.id} onClick={() => {
                setSelectedTrackId(track.id)

                fetch(joinUrl(API_BASE_URL, "tracks", track.id), {
                  // headers: {
                  //   'api-key': 'f505adfb-198d-4a0b-9393-d8b33245ba6f'
                  // }
                }).then(res => res.json())
                  .then(json => setSelectedTrack(json))

              }} className={track.id === selectedTrackId ? "song active" : "song"}>



                <h3 className="songtitle">{track.name}</h3>
                <img
                  className="cover"
                  src={track.cover_url ? joinUrl(API_BASE_URL, track.cover_url) : FALLBACK_COVER}
                  onError={(event) => {
                    event.currentTarget.onerror = null
                    event.currentTarget.src = FALLBACK_COVER
                  }}
                  alt={track.name}
                  width="100%"
                />
                <audio className="audio" src={joinUrl(API_BASE_URL, track.audio_url)} controls></audio>
              </div>
              // </div>
            )
          })}

        </div>
        <div>
          <button className="button-reset" onClick={() => {
            setSelectedTrackId(null)
            setSelectedTrack(null)
          }}>Сбросить активный трек</button>

        </div>
        <div className="desc">
          <h1>Выбранный трек</h1>


          <h3>{selectedTrack === null ? 'Трек не выбран' : selectedTrack.name}</h3>

          <p>
            {selectedTrack?.lyrics ?? 'У этой песни нет текста'}
          </p>

        </div>

      </div>

    </>
  )
}

export default App
