import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {instance} from "../../utils/axios/AxiosConfig";
import './style.css'
import {PlayerContext} from "../contexts/PlayerContext";
import {AudioPath} from "../../utils/audio/AudioConfig";
const Player = (props) => {
    const {playing, setPlaying} = useContext(PlayerContext)
    const track = playing[0]
    const audio = AudioPath + track?.filepath
    const [isPlaying, setIsPlaying] = useState(false)
    const togglePlayPause = () => {
        setIsPlaying((prev) => !prev)
    }

    const audioRef = useRef();
    const playAnimationRef = useRef();
    const progressBarRef = useRef();
    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(50);
    const [isVolumeMuted, setIsVolumeMuted] = useState(false)

    const repeat = useCallback(() => {
     try {
         const currentTime = audioRef.current.currentTime;
         setTimeProgress(currentTime);
         progressBarRef.current.value = currentTime;
         progressBarRef.current.style.setProperty(
             '--range-progress',
             `${(progressBarRef.current.value / duration) * 100}%`
         )
         playAnimationRef.current = requestAnimationFrame(repeat);
     }catch (error) {
         console.log(error)
     }
    }, [audioRef, duration, progressBarRef, setTimeProgress])

    useEffect(() => {
        if (playing !== '') {
            console.log(playing)
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
                cancelAnimationFrame(playAnimationRef.current)
            }
            playAnimationRef.current = requestAnimationFrame(repeat)
        }
    }, [isPlaying, audioRef, repeat]);

    // useEffect(() => {
    //     try {
    //         if (isPlaying) {
    //             try {
    //                 audioRef.current.play();
    //             }catch (e) {
    //                 console.log("awdad")
    //             }
    //
    //         }else {
    //             audioRef.current.pause();
    //         }
    //     }catch (error) {
    //         console.log("ewaea")
    //     }
    //
    // }, [isPlaying, audioRef]);

    useEffect(() => {
        if (audioRef) {
            audioRef.current.volume = volume/100;
            audioRef.current.muted = isVolumeMuted;
        }
    }, [volume, audioRef, isVolumeMuted]);

    const formatTime = (time) => {
        if (time && !isNaN(time)) {
            const minutes = Math.floor(time/60);
            const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
            const seconds = Math.floor(time % 60);
            const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
            return `${formatMinutes}:${formatSeconds}`;
        }
        return '00:00';
    }


    const handleProgressChange = () => {
        audioRef.current.currentTime = progressBarRef.current.value;
    }

    const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration;
        setDuration(seconds);
        progressBarRef.current.max = seconds;
    }

    return (
        <div className="sticky bottom-0 left-0 bg-black w-full h-20 text-white">
            <div className="flex justify-between px-20 pt-4">
                <div className="flex-col min-w-20">
                    <p className="text-left">{track?.title}</p>
                    <div className="flex flex-row">
                        {track?.artistList?.map(
                            artist => {
                                return (
                                    <div key = {artist.id} >
                                        <p className="hover:underline cursor-pointer pr-3">{artist?.name}</p>
                                    </div>
                                )
                            }
                        )}
                    </div>
                </div>
                <div className="flex-col w-1/2">
                    <button onClick={togglePlayPause}>
                        {isPlaying ?
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                            </svg>
                        }
                    </button>
                    <div className="flex">
                        <span className="time current">{formatTime(timeProgress)}</span>
                        <input
                            type = "range"
                            ref = {progressBarRef}
                            defaultValue="0"
                            onChange={handleProgressChange}
                        />
                        <span className="time">{formatTime(duration)}</span>
                    </div>
                </div>
                <div className="flex items-center">
                    <button onClick={() => setIsVolumeMuted((prev) => !prev)} className="mr-4">
                        {
                            isVolumeMuted ?
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                                </svg>
                        }
                    </button>
                    <input
                        type="range"
                        min={0}
                        max = {100}
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                        style={{
                            background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
                        }}
                    />
                </div>
                <audio
                    src={audio}
                    ref = {audioRef}
                    onLoadedMetadata={onLoadedMetadata}
                />
            </div>
        </div>
    );
};

export default Player;