import React from 'react';
import {Link} from "react-router-dom";

const AdminHeader = () => {
    return (
        <div className="bg-black h-20 flex justify-around text-white text-2xl items-center">
            <p><Link to="/admin/artists">Artists</Link></p>
            <p><Link to="/admin/tracks">Tracks</Link></p>
        </div>
    );
};

export default AdminHeader;