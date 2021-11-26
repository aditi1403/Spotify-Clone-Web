import React from "react";
import Header from "./Header";
import "./Body.css";
import { useDataLayerValue } from "./DataLayer";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilledWhite";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SongRow from "./SongRow";
import DurationIcon from '@material-ui/icons/AccessTimeSharp';
import { useEffect } from "react";

function Body({spotify}){

    // Track Duration
    var dHours = Math.floor(4585515 / 3600)%24;
    var dMinutes = Math.floor(4585515 / 60000)%60;
    var dSeconds = ((4585515 % 60000) / 1000).toFixed(0);
    var dTrackTime = dHours + " hr " + dMinutes + " min ";

    const [{ dr, playing }, dispatch] = useDataLayerValue();

    const playPlaylist = (id) => {
        spotify.play({
            context_url: `spotify:playlist:${id}`,
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

    const handlePlayPauseBody = () => {
        if (playing) {
          spotify.pause();
          dispatch({
            type: "SET_PLAYING",
            playing: false,
          });
        } else {
          spotify.play();
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        }
      };

    return (
        <div className="body">
            <Header spotify={spotify}/>

            <div className="body_info">
                <img 
                    src={dr?.images[0].url}
                    alt=""/>
                <div className="body_infoText">
                    <h5>PLAYLIST</h5>
                    <h1>This Is Darshan Raval</h1>
                    {/* <p>This is Darshan Raval. The essential tracks, all in one playlist.</p> */}
                    <p>
                        {dr?.description}
                        <p></p>
                        <a href="https://open.spotify.com/user/spotify">Spotify </a>
                    <span> • 51 songs • {dTrackTime}</span>
                    </p>
                </div>
            </div>

            <div className="body_songs">
                <div className="body_icons">
                    <PlayCircleFilledIcon className="body_shuffle" onClick={playPlaylist}/>
                    {playing ? (
                    <PauseCircleFilledIcon
                        onClick={handlePlayPauseBody,playPlaylist}
                        fontSize="large"
                        className="footer_icon"
                    />
                    ) : (
                    <PlayCircleFilledIcon 
                        onClick={handlePlayPauseBody}
                        fontSize="large" 
                        className="footer_icon" 
                    />
                    )}
                    <FavoriteIcon fontSize="large" className="body_fav"/>
                    <MoreHorizIcon />
                </div>

                {/* Song header */}
                <ul className="body_songsHeader">
                    <li className="body_songsNumber"><p>#</p></li>
                    <li className="body_songsTitle"><p>TITLE</p></li>
                    <li className="body_songsAlbum"><p>ALBUM</p></li>
                    <li className="body_songsRelease"><p>RELEASE</p></li>
                    <li className="body_songsDurationIcon">
                        <DurationIcon className="body_duration" />
                    </li>
                </ul>

                {/* {dr?.tracks.items.map((item) => (
                    <SongRow playSong={playSong} track={item.track} />
                ))} */}
                <div className="body_songNumber">
                    {dr?.tracks.items.map((item) => (
                        <SongRow track={item.track} duration={item.duration} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Body;