import React, {useContext, useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {instance} from "../../utils/axios/AxiosConfig";
import {ImgPath} from "../../utils/img/ImgConfig";
import {TrackContext} from "../contexts/TrackContext";

const EditArtist = () => {

    const params = useParams()
    const artistId = params.id;
    const [artist, setArtist] = useState({});
    const [tracksByArtist, setTracksByArtist] = useState([{}])
    const {tracks} = useContext(TrackContext)
    const imgRef = useRef();
    const [artistImg, setArtistImg] = useState();
    const selectRef = useRef();
    const [assignTrack, setAssignTrack] = useState();

    useEffect(() => {
        const fetchArtist = async () => {
            const response = await instance.post("/admin/getArtist",  {artistId}, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("ADMIN_TOKEN")}`
                }
            })
            setArtist(await response.data)
        }

        fetchArtist();
    }, []);

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const formData = new FormData()
                formData.append("artistId", artistId)
                const response = await instance.post("/admin/getAllTracksByArtist", formData, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("ADMIN_TOKEN")}`
                    }
                })
                setTracksByArtist(await response.data)
                console.log("All tracks by artist: ",await response.data)
            }catch (error) {
                console.log(await error.response.data.message)
            }
        }
        fetchTracks()
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append("file", artistImg)
        formData.append("id", artistId)
        console.log(artistImg)
        const response = await instance.post("/admin/editArtist", formData, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("ADMIN_TOKEN")}`,
                "Content-Type": "multipart/form-data"
            }
        })
        console.log(response)
    }

    const handleImage = (e) => {
        console.log(e.target.files[0])
        setArtistImg(e.target.files[0])
    }

    const handleSubmitTrackAssign = async (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append("trackId", assignTrack)
        formData.append("artistId", artistId)
        const response = await instance.post("/admin/assignArtistToTrack", formData, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("ADMIN_TOKEN")}`
            }
        })

    }

    const handleTrackAssign = () => {
        console.log(selectRef.current.value)
        setAssignTrack(selectRef.current.value)
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="w-3/4 m-auto">
                <div className="text-2xl text-white pt-20 flex justify-between">
                    <div className="flex-col float-left">
                        <div className="pb-10">
                            <img src={ImgPath + artist.imgFilePath} alt="artist" className="w-1/4 rounded-2xl"/>
                        </div>
                        <div className="float-left">
                            <form noValidate onSubmit={(event) => handleSubmit(event)} encType="multipart/form-data">
                                <div className="text-lg">
                                    <label htmlFor="fileUploader" className="cursor-pointer"> Upload new photo </label>
                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg"
                                        className="hidden"
                                        id="fileUploader"
                                        ref={imgRef}
                                        onChange={handleImage}
                                    />
                                </div>
                                <button type="submit" className="pt-5 text-4xl">submit</button>
                                <p>{artistImg?.name}</p>
                            </form>
                        </div>
                    </div>
                    <div className=" text-4xl text-white mx-auto">
                        <div className="text-6xl mb-10">
                            {artist.name}
                        </div>
                        <div className="flex-col">
                            <p className="text-xl pb-10">Add tracks</p>
                            <form noValidate onSubmit={(event) => handleSubmitTrackAssign(event)}>
                                <div className="flex-col">
                                    <select
                                        className="text-black rounded-xl mb-5"
                                        ref = {selectRef}
                                        onChange={handleTrackAssign}
                                    >
                                        {tracks?.map(
                                            track => {
                                                return (
                                                    <option key = {track.id} value={track.id} className="cursor-pointer"> {track.title}</option>
                                                )
                                            }
                                        )}
                                    </select>
                                    <div>
                                        <button type="submit"> Submit </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="flex-col min-w-full">
                            <p className="my-8">Tracks by artist: </p>
                            {tracksByArtist.map(
                                (track, index) => {
                                    return (
                                        <div className="float-left flex items-center hover:opacity-80">
                                            <p className="mr-4">{index + 1}.</p>
                                            <div>
                                                <p className="tracking-wider text-3xl">{track.title}</p>
                                                <div className="flex">
                                                    {track.artistList?.map(
                                                        artist => {
                                                            return (
                                                                <div key = {artist.id} >
                                                                    <p className="mr-1.5 text-xl hover:underline cursor-pointer text-neutral-400">{artist.name}</p>
                                                                </div>
                                                            )
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditArtist;