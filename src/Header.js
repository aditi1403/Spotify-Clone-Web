import React from "react";
import './Header.css';
import SearchIcon from "@material-ui/icons/Search";
import Plans from "@material-ui/icons/Payment";
import { Avatar } from "@material-ui/core";
import { useDataLayerValue } from "./DataLayer";
import { useEffect } from "react";
import { useHistory } from 'react-router';
import ReactDOM from 'react-dom';


function Header({spotify}) {
    const [{ user }, dispatch] = useDataLayerValue();

    const his = useHistory();

    return (
        <div className ="header">
            <div className="header_left">
                <SearchIcon />
                <input
                    placeholder="Artists, songs, or podcasts"
                    type="text"
                />
            </div>

            <div className="header_right" >
                <div className="Plans">
                    <Plans 
                        onClick={()=>his.push('/plans')}
                        fontSize="large" 
                    />
                </div>
               <h5>Plans</h5>
                                
                <Avatar 
                    src={user?.images[0]?.url} 
                    alt={user?.display_name}
                />
                <h4>{user?.display_name}</h4>
            </div>
        </div>
    );
}

export default Header;