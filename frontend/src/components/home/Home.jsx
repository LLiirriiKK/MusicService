import React, {useContext, useRef, useState} from 'react';
import {TrackContext} from "../contexts/TrackContext";
import TrackCard from "./TrackCard";
import {useNavigate} from "react-router-dom";
import Player from "../player/Player";
import {instance} from "../../utils/axios/AxiosConfig";
import {PlayerContext} from "../contexts/PlayerContext";

const Home = () => {

    const {tracks} = useContext(TrackContext)
    const {playing, setPlaying} = useContext(PlayerContext)

    const navigate = useNavigate();

    const [currentTrack, setCurrentTrack] = useState({});

    const handleCurrentTrack =  (id) => {
        const selectedTrack = tracks.filter((track) => track.id === id);
        // setCurrentTrack(selectedTrack)
        setPlaying(selectedTrack)
        console.log(playing)
    }

    return (
        <section className="w-full h-screen bg-gray-50 dark:bg-gray-900">
            <div className="w-1/2 content-center align-middle m-auto pt-10">
                {tracks.map(
                    track => {
                        return(
                            <div key = {track.id}>
                                <TrackCard  track = {track} handleTrack = {handleCurrentTrack}/>
                            </div>
                        )
                    }
                )}
            </div>
            {/*<Player track = {currentTrack[0]} setTrack = {setCurrentTrack}/>*/}
        </section>
    );
};

export default Home;