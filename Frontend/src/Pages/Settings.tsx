// Settings.js
import React from 'react';
import '../Styles/Settings.css';
import { Link } from 'react-router-dom';

const Settings = () => {
  return (
    <div className="settings-container">
      <div className="settings-sidebar">
        <div className="profile-section">
          <img src="profile-image.jpg" alt="Profile" className="profile-image" />
          <span>Smig</span>
        </div>
        <div className="control-section">
          <h3>CONTROL WHO YOU SEE <Link className="Wink-plus" to="/payment"><h6>Wink Plus</h6></Link></h3>
          <div className="setting-item">
            <span>Balanced Recommendations</span>
            <input type="checkbox" checked readOnly />
          </div>
          <p className="setting-description">See the most relevant people to you (default)</p>
          <div className="setting-item">
            <span>Recently Active</span>
          </div>
          <p className="setting-description">See the most recently active people first</p>
        </div>
        <div className="visibility-section">
          <h3>CONTROL MY VISIBILITY</h3>
          <div className="setting-item">
            <span>Standard</span>
            <input type="checkbox" checked readOnly />
          </div>
          <p className="setting-description">You will be discoverable in the card stack</p>
          <div className="setting-item">
            <span>Incognito</span>
            <span className="tinder-plus">Tinder Plus</span>
          </div>
          <p className="setting-description">You will be discoverable only by people you Like</p>
        </div>
        <div className="discovery-section">
          <h3>ENABLE DISCOVERY</h3>
          <label className="switch">
            <input type="checkbox" checked readOnly />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
      <div className="settings-main">
        <div className="profile-card">
          <h2>Smig 24<span className="verified-icon">✓</span></h2>
          <p>Music Producer</p>
          <p>Lives in Kitengela</p>
          <p>Man</p>
          <p>Level 1 unlock @_maji.safi</p>
          <p>No pen and Paper but ill draw your attention.</p>
          <div className="looking-for">
            <span className="icon">🍻</span>
            <p>Looking for Short-term, open to long</p>
          </div>
          <div className="languages">
            <h3>Languages I Know</h3>
            <div className="language-tags">
              <span>English</span>
              <span>Swahili</span>
              <span>French</span>
            </div>
          </div>
          <div className="passions">
            <h3>Passions</h3>
            <div className="passion-tags">
              <span>Memes</span>
              <span>Anime</span>
              <span>Trap Music</span>
              <span>Spotify</span>
              <span>Songwriter</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;