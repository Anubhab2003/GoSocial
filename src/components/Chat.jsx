import React, { useState, useEffect } from 'react';
import socket from '../socket';

function Chat({ selectedUser, userId }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        socket.on('getMessage', (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.off('getMessage');
        };
    }, []);

    const sendMessage = () => {
        socket.emit('sendMessage', {
            senderId: userId,
            receiverId: selectedUser,
            text: newMessage,
        });
        setMessages((prev) => [...prev, { senderId: userId, text: newMessage }]);
        setNewMessage('');
    };

    return (
        <div className="chat">
            <h2>Chat with {selectedUser}</h2>
            <div className="messages">
                {messages.map((message, index) => (
                    <p key={index}>{message.text}</p>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default Chat;
