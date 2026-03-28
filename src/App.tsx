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

  const [trackId, setTrackId] = useState(null)
  const [tracks, setTracks] = useState(null)

  const hendleClickNext = () => {
    if (trackId === (tracks.length)) { setTrackId(1) }
    else (setTrackId(trackId + 1))
  }

  const hendleClickPrev = () => {
    if (trackId === 1) {setTrackId(tracks.length)}
    else (setTrackId(trackId - 1))
  }

  return (
    <>
      <div className="pse-body">

        <div className="global">

          <Header />


          <div className="main-block">

            <TrackList
              onTrackSelect={(id) => { setTrackId(id) }}
              onTracks={setTracks}
              selectedTrackId={trackId}
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
              joinUrl={joinUrl} />

          </div>



          <Footer onTrackSelect={(id) => { setTrackId(id) }}
            trackId={trackId} />
        </div>
      </div>

    </>
  )
}

export default App
