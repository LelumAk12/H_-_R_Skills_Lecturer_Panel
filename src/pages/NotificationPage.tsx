import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { useState, useEffect } from 'react';
import { BellIcon, EyeIcon, Trash2Icon, XIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import '../styles/NotificationPage.css';
export function NotificationPage() {
  const { notifications: contextNotifications, markAsRead, user } = useApp();
  const [notifications, setNotifications] = useState(contextNotifications);
  const [viewedNotification, setViewedNotification] = useState<null | typeof contextNotifications[0]>(null);
  const [deleteNotificationId, setDeleteNotificationId] = useState<string | null>(null);

  useEffect(() => {
    setNotifications(contextNotifications);
  }, [contextNotifications]);

  const handleNotificationClick = (id: string) => {
    markAsRead(id);
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };
  const handleViewNotification = (notification: any) => {
    setViewedNotification(notification);
  };
  const handleDeleteNotification = (id: string) => {
    setDeleteNotificationId(id);
  };
  const confirmDeleteNotification = () => {
    setNotifications(notifications.filter(n => n.id !== deleteNotificationId));
    setDeleteNotificationId(null);
  };
  const closePopup = () => {
    setViewedNotification(null);
    setDeleteNotificationId(null);
  };
  return <div className="notification-page">
      <Sidebar userName={user.name} userEmail={user.email} userImage={user.image} />

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
                <div className="notification-actions">
                  <button className="notification-action-btn view" title="View notification" onClick={e => { e.stopPropagation(); handleViewNotification(notification); }}>
                    <EyeIcon className="notification-action-icon" />
                  </button>
                  <button className="notification-action-btn delete" title="Delete notification" onClick={e => { e.stopPropagation(); handleDeleteNotification(notification.id); }}>
                    <Trash2Icon className="notification-action-icon" />
                  </button>
                </div>
              </div>)}
          </div>

          {/* Popup for viewing notification */}
          {viewedNotification && (
            <div className="notification-popup-overlay">
              <div className="notification-popup-card">
                <button className="notification-popup-close" onClick={closePopup} title="Close"><XIcon /></button>
                <h2 className="notification-popup-title">{viewedNotification.title}</h2>
                <p className="notification-popup-description">{viewedNotification.description}</p>
                <p className="notification-popup-timestamp">{viewedNotification.timestamp}</p>
              </div>
            </div>
          )}

          {/* Popup for delete confirmation */}
          {deleteNotificationId && (
            <div className="notification-popup-overlay">
              <div className="notification-popup-card">
                <button className="notification-popup-close" onClick={closePopup} title="Close"><XIcon /></button>
                <h2 className="notification-popup-title">Delete Notification?</h2>
                <p className="notification-popup-description">Are you sure you want to delete this notification?</p>
                <div className="notification-popup-actions">
                  <button className="notification-popup-btn delete" onClick={confirmDeleteNotification}>Delete</button>
                  <button className="notification-popup-btn cancel" onClick={closePopup}>Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>

        
      </div>
    </div>;
}