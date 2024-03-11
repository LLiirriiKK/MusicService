import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import TrackPage from "./pages/TrackPage";
import Player from "./components/player/Player";
import AdminLogin from "./components/admin/AdminLogin";
import AdminArtistsPage from "./pages/AdminArtistsPage";
import AdminArtistPage from "./pages/AdminArtistPage";
import AdminAllTracksPage from "./pages/AdminAllTracksPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/home/tracks/:id" element={<TrackPage/>}/>
        <Route path="/admin/login" element={<AdminLogin/>}/>
        <Route path="/admin/artists" element={<AdminArtistsPage/>}/>
        <Route path="/admin/artists/:id" element={<AdminArtistPage/>}/>
        <Route path="/admin/tracks" element={<AdminAllTracksPage/>}/>
      </Routes>
        <Player/>
    </div>
  );
}

export default App;
