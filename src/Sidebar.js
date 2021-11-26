import React from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import CreatePlaylist from "@material-ui/icons/AddBox";
import LikedSongs from "@material-ui/icons/ThumbUpAlt";
import { getTokenFromUrl } from "./spotify";
import { useDataLayerValue } from "./DataLayer";

function Sidebar(){
    const [{ playlists }, dispatch] = useDataLayerValue();
    console.log(playlists);

    return (
    <div className="sidebar">
        <img 
            className="sidebar_logo"
            src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
            alt = ""
        />
        <SidebarOption Icon = {HomeIcon} option = "Home" />
        <SidebarOption Icon = {SearchIcon} option = "Search" />
        <SidebarOption Icon = {LibraryMusicIcon} option = "Your Library" />
        <br /> 
        <SidebarOption Icon = {CreatePlaylist} option = "Create Playlist" />
        <SidebarOption Icon = {LikedSongs} option = "Liked Songs" />

            {/* <br /> */}
            {/* <strong className = "sidebar_title">Playlists</strong> */}
        <hr />

        {/* <div class="playlist_title">
            <SidebarOption option="Bollywood dance hits" />
            <SidebarOption option="This Is Darshan Raval" />
            <SidebarOption option="Dance-South" />
            <SidebarOption option="Calm-South" />
            <SidebarOption option="Calm-Hindi" />
        </div> */}

            {/* {user?.display_playlists} */}

            {playlists?.items?.map((playlist) => (
                <SidebarOption option={playlist.name} />
            ))}            
        </div>
    );
}

export default Sidebar;