import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaBoxOpen,
  FaTags,
  FaTruck,
  FaInfoCircle,
  FaBellSlash,
} from 'react-icons/fa';
import './Notification.css';

const INITIAL = [
  {
    id: 1,
    type: 'order',
    icon: FaBoxOpen,
    title: 'Order Confirmed 🎉',
    message: 'Your order for a Custom Portrait Painting has been confirmed.',
    time: '2h ago',
    read: false,
    link: '/pages/portraits',
  },
  {
    id: 2,
    type: 'offer',
    icon: FaTags,
    title: 'Summer Sale is Live!',
    message: 'Up to 50% off on selected handmade pieces. Use code SUMMER50.',
    time: '5h ago',
    read: false,
    link: '/Offers',
  },
  {
    id: 3,
    type: 'ship',
    icon: FaTruck,
    title: 'Out for Delivery',
    message: 'Your Lippan Art wall decor is on its way and arrives today.',
    time: '1d ago',
    read: true,
    link: '/pages/LippanArt',
  },
  {
    id: 4,
    type: 'offer',
    icon: FaTags,
    title: 'Buy One Get One Free',
    message: 'On all keychains & accessories for a limited time.',
    time: '2d ago',
    read: true,
    link: '/pages/Keychains',
  },
  {
    id: 5,
    type: 'info',
    icon: FaInfoCircle,
    title: 'Welcome to Craft Bazaaar 💜',
    message: 'Thanks for joining! Explore our handcrafted collections.',
    time: '3d ago',
    read: true,
    link: '/',
  },
];

export default function Notification() {
  const [items, setItems] = useState(INITIAL);
  const navigate = useNavigate();

  const unreadCount = items.filter((n) => !n.read).length;

  const openNotif = (n) => {
    setItems((prev) => prev.map((it) => (it.id === n.id ? { ...it, read: true } : it)));
    if (n.link) navigate(n.link);
  };

  const markAllRead = () =>
    setItems((prev) => prev.map((it) => ({ ...it, read: true })));

  return (
    <div className="notif-page">
      <header className="notif-hero">
        <p className="notif-hero-eyebrow">Craft Bazaaar · Updates</p>
        <h1 className="notif-hero-title">Notifications</h1>
      </header>

      <div className="notif-content">
        {items.length === 0 ? (
          <div className="notif-empty">
            <FaBellSlash size={30} style={{ color: '#c9a9d4', marginBottom: 12 }} />
            <p>You're all caught up! No notifications right now.</p>
          </div>
        ) : (
          <>
            <div className="notif-toolbar">
              <span className="notif-count">
                {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
              </span>
              {unreadCount > 0 && (
                <button className="notif-clear" onClick={markAllRead}>
                  Mark all as read
                </button>
              )}
            </div>

            <div className="notif-list">
              {items.map((n) => {
                const Icon = n.icon;
                return (
                  <div
                    key={n.id}
                    className={`notif-item ${n.read ? '' : 'unread'}`}
                    onClick={() => openNotif(n)}
                  >
                    <div className={`notif-icon ${n.type}`}>
                      <Icon />
                    </div>
                    <div className="notif-text">
                      <p className="notif-title">{n.title}</p>
                      <p className="notif-message">{n.message}</p>
                    </div>
                    <span className="notif-time">{n.time}</span>
                    {!n.read && <span className="notif-dot" />}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
