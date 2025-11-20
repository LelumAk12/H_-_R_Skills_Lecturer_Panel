import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { Footer } from '../components/Footer';
import { BellIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import '../styles/NotificationPage.css';
export function NotificationPage() {
  const {
    notifications,
    markAsRead,
    user
  } = useApp();
  const handleNotificationClick = (id: string) => {
    markAsRead(id);
  };
  return <div className="notification-page">
      <Sidebar userName={user.name} userEmail={user.email} userImage="/Profile.jpg" />

      <div className="notification-main">
        <Header />

        <div className="notification-content">
          <h1 className="notification-title">Notifications</h1>

          <div className="notification-list">
            {notifications.map(notification => <div key={notification.id} onClick={() => handleNotificationClick(notification.id)} className={`notification-item ${notification.read ? 'read' : 'unread'}`}>
                <div className="notification-icon-wrapper">
                  <BellIcon className="notification-icon" />
                </div>
                <div className="notification-details">
                  <h3 className="notification-item-title">
                    {notification.title}
                  </h3>
                  <p className="notification-description">
                    {notification.description}
                  </p>
                </div>
              </div>)}
          </div>
        </div>

        <Footer />
      </div>
    </div>;
}