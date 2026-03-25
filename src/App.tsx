import { useEffect, useState } from "react"
import "./style.css"
import Header from './components/Header.tsx'
import TrackList from './components/TrackList.tsx'
import TrackDetails from './components/TrackDetails.tsx'
import Footer from './components/Footer.tsx'
import Player from './components/Player.tsx'



function App() {

  const [trackId, setTrackId] = useState(null)

  return (
    <>
      <div className="pse-body">

        <div className="global">

          <Header />


          <div className="main-block">

            <TrackList
              onTrackSelect={(id) => { setTrackId(id) }}
              selectedTrackId={trackId}
            />

            <Player trackId={trackId}
            />

            <TrackDetails trackId={trackId} />

          </div>



          <Footer onTrackSelect={(id) => { setTrackId(id) }}
            trackId={trackId} />
        </div>
      </div>

    </>
  )
}

export default App
