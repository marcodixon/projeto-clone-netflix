import React from "react";
import './Header.css';
import user from "./imagem/logousi.jpg"


export default ({ black }) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/1/15/Logonfx.png" alt="Netflix"></img>
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src={user} alt="Usuárioa"></img>
                </a>
            </div>
        </header>
    );
}