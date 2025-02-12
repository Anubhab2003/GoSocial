import React from 'react';
import DeleteAllPosts from '../components/DeleteAllPosts';

function AdminPage() {
    return (
        <div className="admin-page">
            <h1>Admin Page</h1>
            <DeleteAllPosts />
        </div>
    );
}

export default AdminPage;
