import React, {createContext, useState} from 'react';

export const PlayerContext = React.createContext({});
const PlayerProvider = ({children}) => {

    const [playing, setPlaying] = useState('')

    return (
        <PlayerContext.Provider value={{ playing, setPlaying}}>{ children }</PlayerContext.Provider>
    );
};

export default PlayerProvider;