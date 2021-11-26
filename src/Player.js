import React from "react";
import './Player.css';
import Sidebar from "./Sidebar";
import Body from "./Body";
import Footer from "./Footer";
// import { useState, useEffect } from "react";
// import SpotifyPlayer from "react-spotify-web-playback";

function Player({ spotify }) {
    // const [play, setPlay] = useState(false);

    // useEffect(() => setPlay(true), [trackUri])

    // if (!accessToken) return null

    return (
        <div className="player">
            <div className="player_body">
                <Sidebar />
                <Body spotify={spotify}/>
            </div>
            <Footer spotify={spotify}/>
            {/* <SpotifyPlayer
                token={accessToken}
                showSaveIcon
                callback={(state) => {
                    if (!state.isPlaying) setPlay(false)
                }}
                play={play}
                uris={trackUri ? [trackUri] : []}
            /> */}
        </div>
        
    );
}

export default Player;