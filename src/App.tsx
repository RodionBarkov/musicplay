import { useEffect, useState } from "react"
import "./style.css"
import Header from './components/Header.tsx'
import TrackList from './components/TrackList.tsx'
import TrackDetails from './components/TrackDetails.tsx'
import Footer from './components/Footer.tsx'
import Player from './components/Player.tsx'
import { API_BASE_URL, joinUrl } from './api.tsx';

const FALLBACK_COVER = joinUrl(API_BASE_URL, "data/noimage.png")

function App() {

  const [trackIndex, setTrackIndex] = useState(null)
  const [trackId, setTrackId] = useState(null)
  const [tracks, setTracks] = useState(null)
  const [selectedTrack, setSelectedTrack] = useState(null)
  const [deletedTrack, setDeletedTrack] = useState(null)



  // Загрузка списка треков
  useEffect(() => {
    fetch(joinUrl(API_BASE_URL, "tracks"))
      .then(res => res.json())
      .then(json => {
        setTracks(json);
      });
  }, [deletedTrack]);


  useEffect(() => {
    setTrackId(tracks?.[trackIndex]?.id ?? null)
  }, [trackIndex, tracks])

  // Кнопки переключения треков

  const hendleClickNext = () => {
    if (trackIndex === (tracks.length - 1)) { setTrackIndex(0) }
    else { setTrackIndex(trackIndex + 1) }
  }

  const hendleClickPrev = () => {
    if (trackIndex === 0) { setTrackIndex(tracks.length - 1) }
    else { setTrackIndex(trackIndex - 1) }
  }

  return (
    <>

      <div className="pse-body">

        <div className="global">

          <Header />


          <div className="main-block">

            <TrackList
              onTrackSelect={(i) => { setTrackIndex(i) }}
              tracks={tracks}
              selectedTrack={trackId}
              FALLBACK_COVER={FALLBACK_COVER}
              API_BASE_URL={API_BASE_URL}
              joinUrl={joinUrl}
            />

            <Player trackId={trackId}
              FALLBACK_COVER={FALLBACK_COVER}
              API_BASE_URL={API_BASE_URL}
              joinUrl={joinUrl}
              onClickNext={hendleClickNext}
              onClickPrev={hendleClickPrev}
            />

            <TrackDetails trackId={trackId}
              API_BASE_URL={API_BASE_URL}
              joinUrl={joinUrl}
              onSelectedTrack={(track) => { setSelectedTrack(track) }}
            />

          </div>



          <Footer onTrackSelect={(id) => { setTrackId(id) }}
            trackId={trackId}
            selectedTrack={selectedTrack}
            onDeletedTrack = {(id) => {setDeletedTrack(id)}}
            
            
            />
        </div>
      </div>


    </>
  )
}

export default App
