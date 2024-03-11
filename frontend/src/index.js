import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import TrackProvider from "./components/contexts/TrackContext";
import PlayerProvider from "./components/contexts/PlayerContext";
// import './styles/customize-progress-bar.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <React.StrictMode>
            <TrackProvider>
                <PlayerProvider>
                        <App />
                </PlayerProvider>
            </TrackProvider>
        </React.StrictMode>
    </BrowserRouter>
);

