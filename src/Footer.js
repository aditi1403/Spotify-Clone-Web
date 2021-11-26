import React from "react";
import "./Footer.css";
import FavoriteIcon from "@material-ui/icons/FavoriteBorderOutlined";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import { Grid, Slider } from "@material-ui/core";
import { Favorite } from '@material-ui/icons';
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import DevicesSharpIcon from '@material-ui/icons/DevicesSharp';
import { useDataLayerValue } from "./DataLayer";
import { useEffect } from "react";
import trackTime from "./SongRow";

function Footer({spotify,track}){
  const [{ token, item, playing }, dispatch] =useDataLayerValue();

        useEffect(() => {
          spotify.getMyCurrentPlaybackState().then((r) => {
            console.log(r);
      
            dispatch({
              type: "SET_PLAYING",
              playing: r.is_playing,
            });
      
            dispatch({
              type: "SET_ITEM",
              item: r.item,
            });
          });
        }, [spotify]);
      
        const handlePlayPause = () => {
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
      
        const skipNext = () => {
          spotify.skipToNext();
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
        };
      
        const skipPrevious = () => {
          spotify.skipToPrevious();
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
        };

        // Song Duration
    // var minutes = Math.floor(track.duration_ms / 60000);
    // var seconds = ((track.duration_ms % 60000) / 1000).toFixed(0);
    // var trackTime = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;

    return (
      <div className="footer">
        {/* current song info for the footer song Player*/}
          <div className="footer_left">
              <img className="footer_albumLogo"
                  src={item?.album.images[0].url} 
                  alt={item?.name} 
              />
              {item ? (
                  <div className="footer_songInfo">
                      <h4>{item.name}</h4>
                      <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
                  </div>
              ) : (
                  <div className="footer_songInfo">
                    <h4>No song is playing</h4>
                    <p>...</p>
                  </div>
                )}
              <FavoriteIcon className="footer_heartCurrent" />
          </div>

          {/* play controls for the footer song player*/}
          <div className="footer_center">
              <ShuffleIcon className="footer_green" />
              <SkipPreviousIcon onClick={skipNext} className="footer_icon" />
              {playing ? (
                <PauseCircleOutlineIcon
                  onClick={handlePlayPause}
                  fontSize="large"
                  className="footer_icon"
                />
              ) : (
                <PlayCircleOutlineIcon 
                  onClick={handlePlayPause}
                  fontSize="large" 
                  className="footer_icon" 
                />
              )}
              <SkipNextIcon onClick={skipPrevious} className="footer_icon" />
              <RepeatIcon className="footer_green" />
          </div>
          <div className="footer_durationContainer">
              <span>01:20</span>
              <Slider className="footer_durationBar" />
              <span><h4>{trackTime}</h4></span>
            </div>

          <div className="footer_right">
              <Grid container spacing={2}>
                  <Grid item>
                      <PlaylistPlayIcon />
                  </Grid>
                  <Grid item>
                      <DevicesSharpIcon className="footer__deviceIcon" />
                  </Grid>
                  <Grid item>
                      <VolumeDownIcon />
                  </Grid>
                  <Grid item xs>
                      <Slider aria-labelledby="continuous-slider" />
                  </Grid>
              </Grid>
          </div>
      </div>
    );
}

export default Footer;