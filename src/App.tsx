import { useEffect, useState } from "react"
import "./style.css"
import Header from './components/Header.tsx'
import TrackList from './components/TrackList.tsx'
import ResetButton from './components/ResetButton.tsx'
import TrackDetails from './components/TrackDetails.tsx'
import Footer from './components/Footer.tsx'



function App() {

  const [trackId, setTrackId] = useState(null)

  return (
    <>
      <div className="global">


        <Header />

        <TrackList
          onTrackSelect={(id) => { setTrackId(id) }}
          trackId={trackId}
        />

        <ResetButton onTrackSelect={(id) => { setTrackId(id) }} />

        <TrackDetails trackId={trackId} />

        <Footer />



      </div>

    </>
  )
}

export default App
