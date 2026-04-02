import { useEffect, useRef, useState } from "react";

function Player(props) {
    const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
    const selectedTrackId = props.trackId;

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currTime, setCurrTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);


    

    // Загрузка выбранного трека
    useEffect(() => {
        if (!selectedTrackId) {
            setSelectedTrack(null);
            return;
        }

        // Сбрасываем состояние воспроизведения при смене трека
        setIsPlaying(false);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        const url = props.joinUrl(props.API_BASE_URL, "tracks", selectedTrackId);

        fetch(url)
            .then(res => res.json())
            .then(json => {
                setSelectedTrack(json);
            });
    }, [selectedTrackId]);

    // Автоматическое воспроизведение после загрузки трека
    useEffect(() => {

        if (selectedTrack && selectedTrack.id === selectedTrackId && audioRef.current) {
            const playTimer = setTimeout(() => {
                if (audioRef.current && audioRef.current.readyState >= 2) {
                    audioRef.current.play()
                        .then(() => {
                            setIsPlaying(true);
                        })
                        .catch(error => {
                            setIsPlaying(false);
                        });
                }
            }, 100);

            return () => clearTimeout(playTimer);
        }
    }, [selectedTrack, selectedTrackId]);

    // Управление воспроизведением
    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        setIsPlaying(false);
                    });
                }
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);


    const playPause = () => {
        setIsPlaying(!isPlaying);
    };

    // Обработчики для прогресс-бара
    const updateCurrTime = (value: number) => {
        if (audioRef.current && duration) {
            audioRef.current.currentTime = value * duration;
            setCurrTime(value);
        }
    };

    const onMouseDownClick = () => {
        setIsSeeking(true);
    };

    const onMouseUpClick = (event: React.MouseEvent<HTMLInputElement>) => {
        const newValue = parseFloat(event.currentTarget.value);
        setIsSeeking(false);
        updateCurrTime(newValue);
    };

    const onChangeClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(event.currentTarget.value);
        if (isSeeking) {
            setCurrTime(newValue);
        }
    };

    const handleLoadedMetadata = () => {

        if (audioRef.current) {
            setDuration(audioRef.current.duration);
            setCurrTime(0);
            if (audioRef.current.currentTime !== 0) {
                audioRef.current.currentTime = 0;
            }
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current && !isSeeking) {
            const currentTime = audioRef.current.currentTime;
            const progress = currentTime / audioRef.current.duration;
            setCurrTime(progress);
        }
    };

    const repitTrack = () => {
        audioRef.current.currentTime = 0;
        audioRef.current.play()
    };

    const nextTrack = () => props.onClickNext(selectedTrackId)

    const [isSircle, setIsCircle] = useState(false)

    const cicleTrack = () => {
        setIsCircle(!isSircle)
    }

    // Громкость

    const [volume, setVolume] = useState(0.75)

    useEffect(
        () => {
            if (audioRef.current) {
                audioRef.current.volume = volume
                audioRef.current.muted = isMuted
            }

        }
    ), [];

    // Мьют

    const volumeTrack = (e) => {
        const value = parseFloat(e.target.value);
        setVolume(value);


        if (audioRef.current) { audioRef.current.volume = value }

        if (value === 0) {
            setIsMuted(true)
            audioRef.current.muted = true

        } else {
            setIsMuted(false)
            audioRef.current.muted = false
        }

    }


    const [isMuted, setIsMuted] = useState(false);

    const muteTrack = () => {

        const mute = !isMuted
        setIsMuted(mute)

        if (audioRef.current) {
            audioRef.current.muted = mute
        }
    }



    const safeValue = !isNaN(currTime) && isFinite(currTime) ? currTime : 0;

    // Добавляем отладочную информацию в UI
    return (
        <div className="player">
            {!selectedTrack && !selectedTrackId && <h3>Трек не выбран</h3>}
            {!selectedTrack && selectedTrackId && <h3>Загрузка</h3>}
            {selectedTrack && selectedTrack.id !== selectedTrackId && <h3>Загрузка</h3>}

            {selectedTrack && selectedTrack.id === selectedTrackId && (
                <div className="player-div">

                    <div className="playerCover">
                        <img
                            src={props.API_BASE_URL + '/' + selectedTrack.cover_url}
                            onError={(event) => {
                                event.currentTarget.onerror = null;
                                event.currentTarget.src = props.FALLBACK_COVER;
                            }}
                            alt={selectedTrack.name}
                        />
                    </div>


                    <div className="playerPlay">
                        <audio
                            key={selectedTrack.id}
                            ref={audioRef}
                            src={`${props.API_BASE_URL}/${selectedTrack.audio_url}`}
                            onLoadedMetadata={handleLoadedMetadata}
                            onTimeUpdate={handleTimeUpdate}
                            onEnded={!isSircle ? nextTrack : repitTrack}

                        />

                        <div className="timeLine">
                            <input
                                type="range"
                                min={0}
                                max={1}
                                step="any"
                                value={safeValue}
                                onMouseDown={onMouseDownClick}
                                onMouseUp={onMouseUpClick}
                                onChange={onChangeClick}
                                disabled={!duration}
                                style={{ width: "100%" }}
                            />
                        </div>

                        <div className="playerControls">


                            <div className="volume">

                                <div className="volumeInput">
                                    <input
                                        type="range"
                                        min={0}
                                        max={1}
                                        step="any"
                                        value={isMuted ? 0 : volume}
                                        onChange={volumeTrack}
                                    />
                                </div>


                                <button
                                    className="buttons-play"
                                    onClick={muteTrack}
                                >
                                    {!isMuted ? <img src="./src/assets/playicons/volume.png" alt="Сicle" /> : <img style={{ filter: "none", backgroundColor: '#fff', }} src="./src/assets/playicons/mute.png" alt="Сicle" />}
                                </button></div>

                            <div className="controls">
                                <button
                                    className="buttons-play"
                                    onClick={() => props.onClickPrev(selectedTrackId)}
                                >
                                    <img src="./src/assets/playicons/undo.png" alt="Previous" />
                                </button>

                                <button className="buttons-play" onClick={playPause}>
                                    {isPlaying ?
                                        <img src="./src/assets/playicons/pause.png" alt="Pause" /> :
                                        <img src="./src/assets/playicons/play.png" alt="Play" />
                                    }
                                </button>

                                <button
                                    className="buttons-play"
                                    onClick={() => props.onClickNext(selectedTrackId)}
                                >
                                    <img src="./src/assets/playicons/next.png" alt="Next" />
                                </button>
                            </div>


                            <div className="cicle"> <button
                                className="buttons-play"
                                onClick={cicleTrack}
                            >
                                {!isSircle ? <img src="./src/assets/playicons/cicle.png" alt="Сicle" /> : <img style={{ filter: "none", backgroundColor: '#fff', }} src="./src/assets/playicons/cicle.png" alt="Сicle" />}
                            </button></div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Player;