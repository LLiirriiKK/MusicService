import React, {useEffect, useState} from 'react';
import axios from "axios";
import {instance} from "../../utils/axios/AxiosConfig";

export const TrackContext = React.createContext();

const TrackProvider = ({ children }) => {

    const [tracks, setTracks] = useState([])

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const response = await instance.get("/getAllTracks")
                const respData = await response.data
                setTracks(respData)
                console.log("trackContext:", respData)
            }catch (error){
                console.log(error)
            }
        }

        fetchTracks();

    }, []);

    return <TrackContext.Provider value={{ tracks }}>{ children }</TrackContext.Provider>
};

export default TrackProvider;