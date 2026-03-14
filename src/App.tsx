
function App() {
  
  const tracks = [
    { title: 'Song', url: 'https://musicfun.it-incubator.app/api/samurai-way-soundtrack.mp3'},  
    { title: 'Instrumental', url: 'https://musicfun.it-incubator.app/api/samurai-way-soundtrack-instrumental.mp3'},
    { title: 'Song', url: 'https://musicfun.it-incubator.app/api/samurai-way-soundtrack.mp3'},  
    { title: 'Instrumental', url: 'https://musicfun.it-incubator.app/api/samurai-way-soundtrack-instrumental.mp3'},
  ]

  const divTrack = tracks.map ((track) => {
    return (
      <div className="main">
      <h1>{track.title}</h1>
      <audio src={track.url} controls></audio>
    </div>
    )
  })

  return (
    <>
  
{divTrack}
    </>
  )
}

export default App
 