import React, { useEffect, useState } from 'react';
import socket from '../socket';

function ActiveUsers({ selectUser, userId }) {
    const [activeUsers, setActiveUsers] = useState([]);

    useEffect(() => {
        socket.emit('addUser', userId);

        socket.on('getUsers', (users) => {
            setActiveUsers(users);
        });

        return () => {
            socket.disconnect();
        };
    }, [userId]);

    return (
        <div className="active-users">
            <h2>Active Users</h2>
            <ul>
                {activeUsers.map((user) => (
                    <li key={user.userId} onClick={() => selectUser(user.userId)}>
                        {user.userId}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ActiveUsers;
