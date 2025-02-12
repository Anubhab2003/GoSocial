import React, { useState } from 'react';
import DeleteAllPosts from '../components/DeleteAllPosts';

function AdminPage() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">WELCOME TO ADMIN PANEL</h1>
                <p className="text-gray-600 mb-6">
                    MANAGE THE PANEL CAREFULLY AND BE RESPONSIBLE FOR YOUR ACTIONS.
                </p>
                <button 
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
                    onClick={() => setShowModal(true)}
                >
                    Delete All Posts
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-xl font-bold text-gray-800">Are you sure?</h2>
                        <p className="text-gray-600 mb-4">This action is irreversible.</p>
                        <div className="flex justify-center gap-4">
                            <button 
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <DeleteAllPosts />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminPage;
