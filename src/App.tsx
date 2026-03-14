
function App() {

  const tracks = [
    { id: 1, title: 'Song', url: 'https://musicfun.it-incubator.app/api/samurai-way-soundtrack.mp3' },
    { id: 2, title: 'Instrumental', url: 'https://musicfun.it-incubator.app/api/samurai-way-soundtrack-instrumental.mp3' },
    { id: 3, title: 'Song', url: 'https://musicfun.it-incubator.app/api/samurai-way-soundtrack.mp3' },
    { id: 4, title: 'Instrumental', url: 'https://musicfun.it-incubator.app/api/samurai-way-soundtrack-instrumental.mp3' },
  ]



  return (
    <>

      {tracks.map((track) => {
        return (
          <div key={track.id}className="main">
            <h1>{track.title}</h1>
            <audio src={track.url} controls></audio>
          </div>
        )
      })}
    </>
  )
}

export default App
