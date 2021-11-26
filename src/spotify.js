export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000/";
const clientId = "(your client ID in quotes)";
const clientSecret = "(your client secret in quotes)";

const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
    "user-read-playback-position",
    "user-read-email",
    "user-library-modify",
    "playlist-modify-public",
    "ugc-image-upload",
    "user-follow-modify",
    "user-modify-playback-state",
    "user-read-recently-played",
    "user-read-private",
    "user-library-read",
    "user-top-read",
    "playlist-modify-private",
    "user-follow-read",
    "user-read-playback-state",
    "user-read-currently-playing",
    "playlist-read-private",
    "playlist-read-collaborative",
];

export const getTokenFromUrl = () => {
    return window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
        // #accessToken=mysceretkey&name=aditi
            var parts = item.split('=') 
            initial[parts[0]] = decodeURIComponent(parts[1])

            return initial;
        }, {});
}

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
