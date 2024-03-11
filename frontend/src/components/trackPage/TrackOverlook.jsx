import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import TrackInfo from "./TrackInfo";
import CommentSection from "./CommentSection";
import {ImgPath} from "../../utils/img/ImgConfig";
import {instance} from "../../utils/axios/AxiosConfig";
import Player from "../player/Player";

const TrackOverlook = () => {

    const params = useParams()
    const trackId = params.id

    const [track, setTrack] = useState({})

    useEffect(() => {
        const fetchTrack = async () => {
            const response = await instance.post("/getTrack", {trackId: trackId})
            setTrack(await  response.data)
            console.log( response.data)
        }
        fetchTrack();
    }, []);

    return (
        <div className="min-h-screen">
            <TrackInfo track = {track} trackId = {trackId}/>
            <CommentSection track = {track} trackId = {trackId}/>
        </div>
    );
};

export default TrackOverlook;