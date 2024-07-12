// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import "../Styles/Sidebar.css";

// interface SidebarProps {
//   menuItems: string[];
//   isOpen: boolean;
//   onClose: () => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({ menuItems, isOpen, onClose }) => {
//   const navigate = useNavigate();

//   const handleMenuItemClick = (item: string) => {
//     if (item.toLowerCase() === 'logout') {

//       localStorage.removeItem('token');
      
//       navigate('/login');
//     } else if (item.toLowerCase() === 'account') {
//       navigate('/profile');
//     }else if (item.toLowerCase() === 'payment') {
//       navigate('/payment');
//     }else if (item.toLowerCase() === 'settings') {
//       navigate('/settings');
//     }else {
      
//       console.log(`Clicked on ${item}`);
//     }
//     onClose();
//   };

//   return (
//     <div className={`sidebar ${isOpen ? 'open' : ''}`}>
//       <button className="close-button" onClick={onClose}>×</button>
//       <ul>
//         {menuItems.map((item, index) => (
//           <li key={index} onClick={() => handleMenuItemClick(item)}>{item}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../Styles/Sidebar.css";

interface SidebarProps {
  menuItems: string[];
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems, isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleMenuItemClick = (item: string) => {
    if (item.toLowerCase() === 'logout') {
      localStorage.removeItem('token');
      navigate('/login');
    } else if (item.toLowerCase() === 'account') {
      navigate('/profile');
    } else if (item.toLowerCase() === 'payment') {
      navigate('/payment');
    } else if (item.toLowerCase() === 'settings') {
      navigate('/settings');
    } else {
      console.log(`Clicked on ${item}`);
    }
    onClose();
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-button" onClick={onClose}>×</button>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index} onClick={() => handleMenuItemClick(item)}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;