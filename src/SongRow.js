import React from "react";
import './SongRow.css';
import Body from './Body.js';
import { useDataLayerValue } from './DataLayer';

function SongRow({ track, spotify }) {
    const [{ playlists }, dispatch] = useDataLayerValue();
    console.log(track);

    // Song Duration
    var minutes = Math.floor(track.duration_ms / 60000);
    var seconds = ((track.duration_ms % 60000) / 1000).toFixed(0);
    var trackTime = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;

    const playSong = (id) => {
        spotify.play({
            uris: [`spotify:track:${id}`],
        })
        .then((res) => {
            spotify.getMyCurrentPlayingTrack().then((r) => {
            dispatch({
                type: "SET_ITEM",
                item: r.item,
            });
            dispatch({
                type: "SET_PLAYING",
                playing: true,
            });
            });
        });
    };
    
    return (
        <div className="songRow" onClick={(songRow) => playSong(track.id)}>
            <img className="songRow_album"
                src={track.album.images[0].url} 
                alt="" />
            <div className="songRow_info">
                <h1>{track.name}</h1>
                <p className="songRow_artistName">
                    {track.artists.map((artist) => artist.name).join(", ")} -{" "}
                </p>
                <p className="songRow_albumName">{track.album.name}</p>
                <p className="songRow_albumRelease" >{ track.album.release_date }</p>
                <span className="songRow_infoDuration">{
                    trackTime
                }</span>
            </div>
        </div>
    );
}

export default SongRow;