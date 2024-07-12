import React, { useState } from 'react';
import '../Styles/Chat.css';

interface Message {
  id: number;
  sender: string;
  receiver: string;
  content: string;
  timestamp: string;
}

const Chats: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1, sender: 'John', content: 'Hey Sarah, I saw your profile and thought we might hit it off. Want to chat?', timestamp: '10:00 AM',
      receiver: ''
    },
    {
      id: 2, sender: 'Sarah', content: 'Hi John! Sure, I\'d love to chat. What do you like to do for fun?', timestamp: '10:05 AM',
      receiver: ''
    },
    {
      id: 3, sender: 'Emily', content: 'Alex, I had a great time on our coffee date yesterday. Would you like to meet up again this weekend?', timestamp: '11:30 AM',
      receiver: ''
    },
    {
      id: 4, sender: 'Alex', content: 'Absolutely, Emily! How about we try that new Italian restaurant downtown?', timestamp: '11:45 AM',
      receiver: ''
    },
    {
      id: 5, sender: 'Michael', content: 'Hi Jessica, I noticed we both love hiking. Any favorite trails you\'d recommend?', timestamp: '2:15 PM',
      receiver: ''
    },
    {
      id: 6, sender: 'Jessica', content: 'Hey Michael! I love the Sunset Ridge Trail. Maybe we could hike it together sometime?', timestamp: '2:30 PM',
      receiver: ''
    },
    {
      id: 7, sender: 'David', content: 'Olivia, thanks for a wonderful first date last night. Your laugh is contagious!', timestamp: '9:00 AM',
      receiver: ''
    },
    {
      id: 8, sender: 'Olivia', content: 'David, I had an amazing time too! Can\'t wait to see you again. How about Friday?', timestamp: '9:15 AM',
      receiver: ''
    },
    {
      id: 9, sender: 'Sophia', content: 'Hi Daniel, I saw we matched! I love your travel photos. Where was your favorite place?', timestamp: '3:45 PM',
      receiver: ''
    },
    {
      id: 10, sender: 'Daniel', content: 'Hey Sophia! My favorite was definitely Bali. Have you been there? If not, maybe we could plan a trip! 😉', timestamp: '4:00 PM',
      receiver: ''
    },
    {
      id: 11, sender: 'Emma', content: 'Chris, I enjoyed our video chat last night. It\'s refreshing to connect with someone so genuine online.', timestamp: '11:20 AM',
      receiver: ''
    },
    {
      id: 12, sender: 'Chris', content: 'Emma, I felt the same way! How about we meet in person this week? I know a great little café.', timestamp: '11:35 AM',
      receiver: ''
    },
    {
      id: 13, sender: 'Liam', content: 'Ava, your profile mentioned you\'re a dog lover. I volunteer at the local shelter - want to join me this weekend?', timestamp: '1:50 PM',
      receiver: ''
    },
    {
      id: 14, sender: 'Ava', content: 'Liam, that sounds perfect! I\'d love to meet you and some furry friends. Count me in!', timestamp: '2:05 PM',
      receiver: ''
    },
    {
      id: 15, sender: 'Noah', content: 'Mia, I had a blast bowling with you yesterday. You\'ve got quite the competitive streak!', timestamp: '10:40 AM',
      receiver: ''
    },
    {
      id: 16, sender: 'Mia', content: 'Haha, guilty as charged, Noah! Ready for a rematch? Loser buys dinner! 😊', timestamp: '10:55 AM',
      receiver: ''
    },
  ]);

  // ... rest of the component


  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '' && selectedUser) {
      const newMsg: Message = {
        id: messages.length + 1,
        sender: 'You',
        receiver: selectedUser,
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const uniqueUsers = Array.from(new Set(messages.map(m => m.sender === 'You' ? m.receiver : m.sender)));

  const getConversation = (user: string) => {
    return messages.filter(m => 
      (m.sender === user && m.receiver === 'You') || 
      (m.sender === 'You' && m.receiver === user)
    );
  };

  return (
    <div className="chat-container">
      <div className="message-list">
        {uniqueUsers.map((user) => (
          <div key={user} className="message-item" onClick={() => setSelectedUser(user)}>
            <div className="message-avatar"></div>
            <div className="message-info">
              <div className="message-name">{user}</div>
              <div className="message-preview">
                {getConversation(user).slice(-1)[0]?.content.substring(0, 30)}...
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-area">
        <div className="chat-header">
          <h2>Chat with {selectedUser || 'Someone'}</h2>
        </div>
        <div className="chat-messages">
          {selectedUser && getConversation(selectedUser).map((message) => (
            <div key={message.id} className={`message ${message.sender === 'You' ? 'sent' : 'received'}`}>
              <div className="message-content">{message.content}</div>
              <div className="message-timestamp">{message.timestamp}</div>
            </div>
          ))}
        </div>
        <div className="message-input">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={!selectedUser}
          />
          <button onClick={handleSendMessage} disabled={!selectedUser}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chats;
