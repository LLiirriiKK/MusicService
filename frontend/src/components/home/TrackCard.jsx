import React from 'react';
import {useNavigate} from "react-router-dom";
const TrackCard = (props) => {

    const {track, handleTrack} = props

    const navigate = useNavigate();
    const getTrackInfo =  (id) => {
        navigate("/home/tracks/" + id)
    }



    return (
        <div className="p-5 align-middle content-center mb-4 text-white border-2 border-transparent hover:rounded-2xl hover:border-white hover:border-solid hover:border-2 hover:bg-hover-color hover:transition 0.2s">
            <div className="flex items-center justify-between">
                <svg
                    className="w-6 h-6 text-gray-800 dark:text-white mr-4 cursor-pointer"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 10 16"
                    onClick={() => handleTrack(track.id)}
                >
                    <path d="M3.414 1A2 2 0 0 0 0 2.414v11.172A2 2 0 0 0 3.414 15L9 9.414a2 2 0 0 0 0-2.828L3.414 1Z"/>
                </svg>
                <div className="flex-col">
                    <p className="tracking-wider text-3xl">{track.title}</p>
                    <div className="flex flex-row">
                        {track.artistList.map(
                            artist => {
                                return (
                                    <div key = {artist.id} >
                                        <p className="mr-1.5 text-xl hover:underline cursor-pointer">{artist.name}</p>
                                    </div>
                                )
                            }
                        )}
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer" onClick={() => getTrackInfo(track.id)}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
            </div>
        </div>
    );
};

export default TrackCard;