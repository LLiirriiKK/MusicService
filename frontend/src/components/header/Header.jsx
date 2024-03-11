import React from 'react';
import {Link, useNavigate} from "react-router-dom";

const Header = () => {

    const navigate = useNavigate()

    return (
        <header className="font-main bg-black">
            <div className="px-5 py-3">
                <div className="flex  justify-between items-center ">
                    <div>
                        <p className="text-white font-bold text-4xl content-center"><Link to="/home">MusicPlayer</Link></p>
                    </div>
                    <ul className="flex text-2xl text-white p-6">
                        <li className="mr-8">Home</li>
                        <li>Profile</li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;