import React, {useEffect, useState} from 'react';
import {ImgPath} from "../../utils/img/ImgConfig";

const TrackInfo = (props) => {

    const {track, trackId} = props
    // const params = useParams()
    // const trackId = params.id
    // const [track, setTrack] = useState({})

    const image = ImgPath

    return (
        <section className="w-full bg-gray-50 dark:bg-gray-900 pt-8 px-10 pb-12">
            <div className="flex items-center" >
                <div>
                    <img src={image} alt="album-cover" className="w-3/4 rounded-2xl"/>
                </div>
                <div className="flex-col">
                    <p className="text-white text-8xl font-semibold tetracking-wide mb-12"> {track.title}</p>
                    <div className="flex mb-8">
                        {track.artistList?.map(
                        artist => {
                            return (
                                <div key = {artist.id} className="text-white pr-4 text-2xl">
                                    {artist.name}
                                </div>
                            )
                        }
                    )}
                    </div>
                    <p className="m-0 p-0 text-white text-xl">
                        {track.releaseDate}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default TrackInfo;