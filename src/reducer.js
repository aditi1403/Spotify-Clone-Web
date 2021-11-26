import { findAllByDisplayValue } from "@testing-library/react";

export const initialState = {
    user: null,
    playlists: [],
    spotify: null,
    dr: null,
    top_artists: null,
    playing: false,
    item: null,
};

const reducer = (state, action) => {
    console.log(action);

    switch(action.type){
        case 'SET_USER':
            return {
                ...state,
                user: action.user,
            };

        case "SET_PLAYING":
            return {
                ...state,
                playing: action.playing,
            };
          
        case "SET_ITEM":
            return {
                ...state,
                item: action.item,
            };

        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token,
            };

        case "SET_PLAYLISTS" :
            return {
                ...state,
                playlists: action.playlists,
            };
        
        case "SET_TOP_ARTISTS":
            return {
                ...state,
                top_artists: action.top_artists,
            };

        case "SET_SPOTIFY":
            return {
                ...state,
                spotify: action.spotify,
            };
            
        case "THIS_IS_DR":
            return {
                ...state,
                dr: action.dr,
            };
            
            default:
                return state;
    }
};

export default reducer;