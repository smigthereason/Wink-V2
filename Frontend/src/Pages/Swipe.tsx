import React, { useState, useEffect } from 'react';
import "../Styles/Swipe.css";
import { Profile } from '../type';
import { GiCancel } from "react-icons/gi";
import { FcLike } from "react-icons/fc";
import { IoMdStarOutline } from "react-icons/io";


        

const Swipe: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch('http://localhost:5000/profile/all');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.profiles && Array.isArray(data.profiles)) {
          setProfiles(data.profiles);
        } else {
          console.error('Unexpected data structure:', data);
        }
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };
    fetchProfiles();
  }, []);

  const handleSwipe = (direction: 'left' | 'right') => {
    // Here you would implement the logic to handle the swipe
    console.log(`Swiped ${direction} on ${profiles[currentProfileIndex].name}`);
    setCurrentProfileIndex(prevIndex => (prevIndex + 1) % profiles.length);
  };

  const handleFavorite = () => {
    // Implement favorite functionality
    console.log(`Favorited ${profiles[currentProfileIndex].name}`);
  };

  if (profiles.length === 0) {
    return <div>Loading profiles...</div>;
  }

  const currentProfile = profiles[currentProfileIndex];

  return (
    <div className="swipe-container">
      <div className="profile-card">
       
        <div className="profile-info">
          <h2>{currentProfile.name}, {currentProfile.age}</h2>
          <p>{currentProfile.occupation}</p>
          <div></div>
          {currentProfile.photos && (
          <img src="https://images.unsplash.com/photo-1521033719794-41049d18b8d4?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"alt={currentProfile.name} className="profile-image" />
          )}
          {/* {currentProfile.photos[0]}  */}
        </div>
      </div>
      <div className="action-buttons">
        <button onClick={() => handleSwipe('left')} className="action-button x-button"><GiCancel size={32} /></button>
        <button onClick={handleFavorite} className="action-button star-button"><IoMdStarOutline size={40} /></button>
        <button onClick={() => handleSwipe('right')} className="action-button heart-button"><FcLike size={32} /></button>
      </div>
    </div>
  );
};

export default Swipe;
