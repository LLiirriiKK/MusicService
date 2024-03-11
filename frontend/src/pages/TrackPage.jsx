import React from 'react';
import Header from "../components/header/Header";
import TrackInfo from "../components/trackPage/TrackInfo";
import CommentSection from "../components/trackPage/CommentSection";
import TrackOverlook from "../components/trackPage/TrackOverlook";
import Player from "../components/player/Player";

const TrackPage = () => {
    return (
        <div >
            <Header/>
            <TrackOverlook/>
        </div>
    );
};

export default TrackPage;