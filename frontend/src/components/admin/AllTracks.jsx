import React, {useContext, useState} from 'react';
import {TrackContext} from "../contexts/TrackContext";
import TrackCard from "../home/TrackCard";
import {instance} from "../../utils/axios/AxiosConfig";

const AllTracks = () => {
    const {tracks} = useContext(TrackContext)
    const [curTrack, setCurTrack] = useState()
    const [trackName, setTrackName] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append("title", trackName)
        formData.append("file", curTrack)
        const response = await instance.post("/admin/addTrack", formData, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("ADMIN_TOKEN")}`,
                "Content-Type": "multipart/form-data"
            }
        })
        console.log(response)
    }

    const handleAudio = (e) => {
        console.log(e.target.files[0])
        setCurTrack(e.target.files[0])
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="w-1/2 content-center align-middle m-auto pt-10">
                <div>
                    <form noValidate onSubmit={(event) => handleSubmit(event)}  encType="multipart/form-data">
                        <div className="mb-10">
                            <input
                                type="text"
                                placeholder="Track title"
                                size="40"
                                className="text-3xl rounded-xl"
                                value = {trackName}
                                onChange={(event) => setTrackName(event.target.value)}
                            />
                        </div>
                        <div className="text-white text-2xl pb-10">
                            <label htmlFor="fileUploader" className="cursor-pointer"> Upload audio </label>
                            <input
                                type="file"
                                accept=".mp3"
                                className="hidden"
                                id="fileUploader"
                                onChange={handleAudio}
                            />
                        </div>
                        <button type = "submit" className="text-white text-2xl"> Submit </button>
                    </form>
                    <p className="text-white text-xl">{curTrack?.name}</p>
                </div>
                <div>
                    {tracks.map(
                        track => {
                            return(
                                <div>
                                    <TrackCard key = {track.id} track = {track}/>
                                </div>
                            )
                        }
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllTracks;