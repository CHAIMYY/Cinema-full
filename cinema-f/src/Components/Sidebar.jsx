import React from "react";
import { Link } from 'react-router-dom';


export default function Header() {
    return (
        <>
         <div className="sidebar">
                    <Link to="/users">
                        <button className="">Users</button>
                    </Link>
                    <Link to="/Amovies">
                        <button className="">Movies</button>
                    </Link>
                    <Link to="/Stats">
                        <button className="">Stats</button>
                    </Link>
                    <Link to="/MovieCreate">
                        <button className="">Create movies</button>
                    </Link>
                   
                </div>
        
        
        </>)}