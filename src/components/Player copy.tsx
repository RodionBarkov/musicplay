import { useEffect, useRef, useState } from "react";

function Player(props) {

    const [selectedTrack, setSelectedTrack] = useState<Track | null>(null)
    const selectedTrackId = props.trackId;

    useEffect(() => {
        if (!selectedTrackId) {
            setSelectedTrack(null);
            return;
        }
        fetch(props.joinUrl(props.API_BASE_URL, "tracks", selectedTrackId))
            .then(res => res.json())
            .then(json => setSelectedTrack(json));
    }, [selectedTrackId]);

    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const [currTime, setCurrTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);


    const playPause = () => {
        setIsPlaying(!isPlaying);
    };

    const [tracks, setTracks] = useState<Track[] | null>(null)

    useEffect(() => {
        fetch(props.joinUrl(props.API_BASE_URL, "tracks"), {
        }).then(res => res.json())
            .then(json => setTracks(json))
    }, [])

    console.log(tracks);

    // Функция для переключения на следующий трек
    const nextTrack = () => {
        if (!selectedTrackId || tracks.length === 0) return;

        const currentIndex = tracks.findIndex(track => track.id === selectedTrackId);
        if (currentIndex !== -1 && currentIndex < tracks.length - 1) {
            const nextTrackId = tracks[currentIndex + 1].id;
            props.onTrackChange?.(nextTrackId); // Вызываем callback для смены трека
        }
    };

    // Функция для переключения на предыдущий трек
    const prevTrack = () => {
        if (!selectedTrackId || tracks.length === 0) return;

        const currentIndex = tracks.findIndex(track => track.id === selectedTrackId);
        if (currentIndex > 0) {
            const prevTrackId = tracks[currentIndex - 1].id;
            props.onTrackChange?.(prevTrackId); // Вызываем callback для смены трека
        }
    };

    // Управление воспроизведением
    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log("Playback failed:", error);
                        setIsPlaying(false);
                    });
                }
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);



    useEffect(() => {
        if (selectedTrack && selectedTrack.id === selectedTrackId) {
            const timer = setTimeout(() => {
                if (audioRef.current && audioRef.current.readyState >= 2) {
                    audioRef.current.play()
                        .then(() => setIsPlaying(true))
                        .catch(error => console.log("Auto-play error:", error));
                }
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [selectedTrack, selectedTrackId]);

    const updateCurrTime = (value) => {
        if (audioRef.current && duration) {
            audioRef.current.currentTime = value * duration;
            setCurrTime(value);
        }
    };

    const onMouseDownClick = () => {
        setIsSeeking(true);
    };

    const onMouseUpClick = (event) => {
        const newValue = parseFloat(event.currentTarget.value);
        setIsSeeking(false);
        updateCurrTime(newValue);

        // Если трек был на паузе и пользователь переместил ползунок,
        // не меняем состояние воспроизведения
        if (!isPlaying && audioRef.current) {
            // Просто обновляем позицию, воспроизведение не меняем
            audioRef.current.currentTime = newValue * duration;
        }
    };

    const onChangeClick = (event) => {
        const newValue = parseFloat(event.currentTarget.value);
        if (isSeeking) {
            // Во время поиска обновляем только отображение
            setCurrTime(newValue);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
            // Сбрасываем время на 0 при загрузке нового трека
            setCurrTime(0);
            if (audioRef.current.currentTime !== 0) {
                audioRef.current.currentTime = 0;
            }
        }
    };

    // Обработчик обновления времени
    const handleTimeUpdate = () => {
        if (audioRef.current && !isSeeking) {
            const currentTime = audioRef.current.currentTime;
            const progress = currentTime / audioRef.current.duration;
            setCurrTime(progress);
        }
    };

    const safeValue = !isNaN(currTime) && isFinite(currTime) ? currTime : 0;

    return (
        <div className="player">

            {!selectedTrack && !selectedTrackId && <h3> Трек не выбран</h3>}
            {!selectedTrack && selectedTrackId && <h3>Загрузка</h3>}
            {selectedTrack && selectedTrackId && selectedTrack?.id !== selectedTrackId && <h3>Загрузка</h3>}
            {selectedTrack &&

                <div className="player-div">
                    <img src={props.API_BASE_URL + '/' + selectedTrack.cover_url} onError={(event) => {
                        event.currentTarget.onerror = null
                        event.currentTarget.src = props.FALLBACK_COVER
                    }}
                        alt={selectedTrack.name} />

                    <div className="player-play">


                        <div><audio
                            ref={audioRef}
                            src={`${props.API_BASE_URL}/${selectedTrack.audio_url}`}
                            controls={true}
                            onLoadedMetadata={handleLoadedMetadata}
                            onTimeUpdate={handleTimeUpdate}
                            onEnded={() => setIsPlaying(false)}
                        ></audio></div>

                        <div>
                            <input type="range"
                                min={0}
                                max={1}
                                step={"any"}
                                value={safeValue}
                                onMouseDown={onMouseDownClick}
                                onMouseUp={onMouseUpClick}
                                onChange={onChangeClick}
                                disabled={!duration}
                                style={{ width: "100%" }}
                            />
                        </div>

                        <div>
                            <button className="buttons-play" onClick={prevTrack}
                                disabled={!selectedTrackId || tracks.findIndex(t => t.id === selectedTrackId) === 0}>
                                <img src="./src/assets/playicons/undo.png" alt="" />
                            </button>
                            <button className="buttons-play" onClick={playPause}>
                                {isPlaying ? <img src="./src/assets/playicons/pause.png" alt="" /> : <img src="./src/assets/playicons/play.png" alt="" />}
                            </button>
                            <button className="buttons-play" onClick={nextTrack}
                                disabled={!selectedTrackId || tracks.findIndex(t => t.id === selectedTrackId) === tracks.length - 1}>
                                <img src="./src/assets/playicons/next.png" alt="" />
                            </button>
                        </div>

                    </div>

                </div>

            }
        </div>
    )
}

export default Player