import React, {useEffect, useRef, useState} from 'react';
import {instance} from "../../utils/axios/AxiosConfig";
import {useNavigate} from "react-router-dom";
import {ImgPath} from "../../utils/img/ImgConfig";

const AllArtists = () => {
    const [artists, setArtists] = useState();
    const navigate = useNavigate();
    const [artistAdd, setArtistAdd] = useState('');

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const response = await instance.post("/admin/getArtists", {}, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("ADMIN_TOKEN")}`
                    }
                })
                setArtists(await response.data)
                console.log(await response.data)
            }catch (error) {
                if(error.response.status === 401) {
                    alert("Your session has expired. You are being redirect to login page")
                    await sleep(1500)
                    navigate("/admin/login")
                }else {
                    console.log(error)
                }
            }
        }
        fetchArtists()
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
            const formData = new FormData();
            formData.append("artistName", artistAdd)
            const response = await instance.post("/admin/addArtist", formData, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("ADMIN_TOKEN")}`
                }
            })
        }catch (error) {
            console.log(error)
        }
    }

    const goToArtist = (id) => {
        navigate("/admin/artists/" + id)
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-10">
            <div className="text-2xl">
                <p className="text-white">Add artist</p>
                <form noValidate onSubmit={(event) => handleSubmit(event)}>
                    <div className="mb-10">
                        <input
                            type="text"
                            placeholder="Artist name"
                            size="40"
                            className="text-3xl rounded-xl"
                            value = {artistAdd}
                            onChange={(event) => setArtistAdd(event.target.value)}
                        />
                    </div>
                    <button type = "submit" className="text-white text-2xl"> Submit </button>
                </form>
            </div>
            <div className="text-2xl flex-col">
                    {artists?.map(artist => {
                        return (
                            <div key = {artist.id} className="p-8 align-middle content-center text-white border-2 border-transparent hover:rounded-2xl hover:border-white hover:border-solid hover:border-2 hover:opacity-80 w-3/4 m-auto">
                                <div className="cursor-pointer pb-10 text-2xl hover:underline" onClick={() => goToArtist(artist.id)}>{artist.name}</div>
                                <div className="">
                                    <div className="">
                                        <img src={ImgPath + artist.imgFilePath} alt="artist" className="w-1/4 rounded-xl mx-auto"/>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </div>

        </div>
    );
};

export default AllArtists;