import React, { useEffect, useState } from 'react';
import { Client, Account } from 'appwrite';
import conf from '../conf/conf';


const client = new Client()
    .setEndpoint(conf.appwriteUrl) // Your Appwrite endpoint
    .setProject(conf.appwriteProjectId); // Your Appwrite project ID

const account = new Account(client);

function UserDashboard() {
    const [user, setUser] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await account.get();
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Welcome {user ? user.name : 'Guest'}
                </h1>
                <p className="text-gray-600">
                    This is your dashboard. Here you can manage your activities.
                </p>
                <button 
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
                    onClick={async () => {
                        await account.deleteSession('current');
                        window.location.reload();
                    }}
                >
                    Logout
                </button>
            </div>

            
        </div>
    );
}

export default UserDashboard;
