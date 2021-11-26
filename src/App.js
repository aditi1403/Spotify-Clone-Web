import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./Login";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Player";
import { useDataLayerValue } from "./DataLayer";
import {BrowserRouter as Router , Route, Switch} from "react-router-dom";
import Plans from './Screens/Plans';
// import Search from './Search';

const spotify = new SpotifyWebApi();

function App() {
    document.oncontextmenu = new Function("return false;");

    const [token, setToken] = useState(null);
    const [{ user }, dispatch] = useDataLayerValue();
    // const code = new URLSearchParams(window.location.search).get("code")
    

    useEffect(() => {
        const hash = getTokenFromUrl(); 
        window.location.hash = "";
        const _token = hash.access_token;

        if (_token) {

            dispatch({
                type: "SET_TOKEN",
                token: _token,
            });

            setToken(_token)

            spotify.setAccessToken(_token);
            // user
            spotify.getMe().then((user) => {
                dispatch({
                    type: 'SET_USER',
                    user: user,
                });
            });

            // playlists
            spotify.getUserPlaylists().then((playlists) => {
                dispatch({
                    type: "SET_PLAYLISTS",
                    playlists: playlists,
                });
            });

            spotify.getMyTopArtists().then((response) =>
                dispatch({
                    type: "SET_TOP_ARTISTS",
                    top_artists: response,
                })
            );

            dispatch({
                type: "SET_SPOTIFY",
                spotify: spotify,
            });

            // this is darshan raval
            spotify.getPlaylist('37i9dQZF1DZ06evO1xDLmU').then((response) => 
                dispatch({
                    type: "THIS_IS_DR",
                    dr: response,
                })
            );
        }

    }, [token, dispatch]);

    return (
        <div className="app">
            
            {
                !token && <Login />}
            <Router>
            {
            token ? (
                <Switch>

                <Route path="/plans">
                    <Plans/>
                </Route>
                <Route exact path="/">
                    <Player spotify={spotify}/>
                </Route>

                </Switch>
                ):(
                <Login/>
                )
            }
            </Router>
            {/* <Search code={code} /> : <Login /> */}
        </div>
    );
}

export default App;