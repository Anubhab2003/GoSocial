import React from 'react';
import DeleteAllPosts from '../components/DeleteAllPosts';

function AdminPage() {
    return (
        <div className="admin-page">
            <h1>WELCOME TO ADMIN PANEL</h1>
            <p>WITH GREAT POWERS COMES GREAT RESPONSIBILITY, SO MANAGE THE PANEL VERY CAREFULLY AND BE RESPONSIBLE FOR YOUR CAUSE</p>
            <DeleteAllPosts />
        </div>
    );
}

export default AdminPage;
