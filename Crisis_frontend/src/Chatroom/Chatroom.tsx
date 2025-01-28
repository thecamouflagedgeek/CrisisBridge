import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Chatroom: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [message, setMessage] = useState('');
    const [participants, setParticipants] = useState(['Producer', 'Delivery Person']);

    useEffect(() => {
        // this is to listen for incoming messages
        socket.on('message', (msg: string) => {
            setMessages((prev) => [...prev, msg]);
        });
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('message', message); // this is to Send message to server, lmao this took long
            setMessages((prev) => [...prev, `You: ${message}`]);
            setMessage('');
        }
    };

    const addParticipant = () => {
        const newParticipant = prompt('Enter participant name:');
        if (newParticipant) setParticipants((prev) => [...prev, newParticipant]);
    };

    return (
        <div style={chatroomStyle}>
            <div style={sidebarStyle}>
                <h2>Chats</h2>
                {participants.map((participant, index) => (
                    <div key={index} style={participantStyle}>
                        {participant}
                    </div>
                ))}
                <button style={inviteButtonStyle} onClick={addParticipant}>+ Invite</button>
            </div>
            <div style={chatWindowStyle}>
                <div style={chatHeaderStyle}>Chat</div>
                <div style={messageContainerStyle}>
                    {messages.map((msg, index) => (
                        <div key={index} style={messageStyle}>
                            {msg}
                        </div>
                    ))}
                </div>
                <div style={inputContainerStyle}>
                    <input
                        style={inputStyle}
                        type="text"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button style={sendButtonStyle} onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

const chatroomStyle: React.CSSProperties = {
    display: 'flex',
    width: '98vw',
    height: '93vh',
    fontFamily: 'Arial, sans-serif'
};

const sidebarStyle: React.CSSProperties = {
    width: '25%',
    backgroundColor: '#202c33',
    color: 'white',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
};

const participantStyle: React.CSSProperties = {
    padding: '10px',
    backgroundColor: '#2a3942',
    borderRadius: '5px',
    cursor: 'pointer'
};

const inviteButtonStyle: React.CSSProperties = {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#00a884',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    cursor: 'pointer',
    fontWeight: 'bold'
};

const chatWindowStyle: React.CSSProperties = {
    width: '75%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f4f4f4'
};

const chatHeaderStyle: React.CSSProperties = {
    padding: '20px',
    backgroundColor: '#00a884',
    color: 'white',
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: 'bold'
};

const messageContainerStyle: React.CSSProperties = {
    flex: 1,
    padding: '20px',
    overflowY: 'auto'
};

const messageStyle: React.CSSProperties = {
    marginBottom: '10px',
    color: 'black',
    padding: '10px',
    backgroundColor: '#d9fdd3',
    borderRadius: '5px',
    alignSelf: 'flex-start'
};

const inputContainerStyle: React.CSSProperties = {
    display: 'flex',
    padding: '10px',
    backgroundColor: '#ededed'
};

const inputStyle: React.CSSProperties = {
    flex: 1,
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px'
};

const sendButtonStyle: React.CSSProperties = {
    padding: '10px',
    backgroundColor: '#00a884',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    cursor: 'pointer',
    fontWeight: 'bold'
};

export default Chatroom;
