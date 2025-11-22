import { useNavigate, useLocation } from 'react-router-dom';
import { UserIcon, BookOpenIcon, RadioIcon, CreditCardIcon, BellIcon, SettingsIcon, LogOutIcon } from 'lucide-react';
import '../styles/Sidebar.css';
interface SidebarProps {
  userName: string;
  userEmail: string;
  userImage: string;
}
export function Sidebar({
  userName,
  userEmail,
  userImage
}: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = [{
    icon: UserIcon,
    label: 'Profile',
    path: '/lecturer/profile'
  }, {
    icon: BookOpenIcon,
    label: 'My Courses',
    path: '/lecturer/courses'
  }, {
    icon: RadioIcon,
    label: 'Live',
    path: '/lecturer/live-module',
    isRed: true
  }, {
    icon: CreditCardIcon,
    label: 'Payment',
    path: '/lecturer/payment'
  }, {
    icon: BellIcon,
    label: 'Notification',
    path: '/lecturer/notification'
  }, {
    icon: SettingsIcon,
    label: 'Settings',
    path: '/lecturer/settings'
  }];
  const isActive = (path: string) => location.pathname === path;
  return <div className="sidebar">
      <div className="sidebar-profile">
        <img src={userImage} alt={userName} className="sidebar-profile-image" />
        <div className="sidebar-profile-info">
          <h3 className="sidebar-profile-name">{userName}</h3>
          <p className="sidebar-profile-email">{userEmail}</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map(item => <button key={item.path} onClick={() => navigate(item.path)} className={`sidebar-nav-item ${isActive(item.path) ? 'active' : ''} ${item.isRed ? 'red' : ''}`}>
            <item.icon className="sidebar-nav-icon" />
            <span>{item.label}</span>
          </button>)}
      </nav>

      <button onClick={() => navigate('/lecturer/login')} className="sidebar-logout">
        <LogOutIcon className="sidebar-nav-icon" />
        <span>Logout</span>
      </button>
    </div>;
}