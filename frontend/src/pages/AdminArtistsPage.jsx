import React from 'react';
import AllArtists from "../components/admin/AllArtists";
import AdminHeader from "../components/admin/AdminHeader";

const AdminArtistsPage = () => {
    return (
        <div>
            <AdminHeader/>
            <AllArtists/>
        </div>
    );
};

export default AdminArtistsPage;