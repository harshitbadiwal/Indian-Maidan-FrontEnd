import React, { useState } from "react";
import styles from "./Notification.module.scss"; // Import SCSS module
import { Bell, BellRing, Check, Filter } from "lucide-react";

const categories = {
  turf: { icon: "🏟", label: "Turf Bookings" },
  academy: { icon: "🎓", label: "Academy Updates" },
  buddy: { icon: "👥", label: "Buddy Requests" },
  umpire: { icon: "🏅", label: "Umpire" },
  tournament: { icon: "🏆", label: "Tournaments" },
  payment: { icon: "💳", label: "Payments" },
  maintenance: { icon: "🔧", label: "Maintenance" },
  coaching: { icon: "👨‍🏫", label: "Personal Coaching" },
  events: { icon: "📅", label: "Events" },
  offers: { icon: "🎉", label: "Special Offers" },
};

const initialNotifications = [
  {
    id: 1,
    type: "turf",
    message: "Your turf booking for Football Ground is confirmed for tomorrow at 6 PM",
    time: "2025-02-03T18:00:00",
    isRead: false,
  },
  {
    id: 2,
    type: "academy",
    message: "New badminton training batch starting next week at ProSports Academy",
    time: "2025-02-03T12:00:00",
    isRead: false,
  },
  {
    id: 3,
    type: "tournament",
    message: "Local Cricket Tournament registrations are now open",
    time: "2025-02-02T14:00:00",
    isRead: false,
  },
];

const NavigationMenu = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isHovered, setIsHovered] = useState(false);

  // Function to group notifications by date
  const groupNotificationsByDate = (notifications) => {
    return notifications.reduce((acc, notif) => {
      const date = new Date(notif.time).toLocaleDateString();
      acc[date] = acc[date] ? [...acc[date], notif] : [notif];
      return acc;
    }, {});
  };

  const groupedNotifications = groupNotificationsByDate(notifications);

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, isRead: true })));
  };

  return (
    <nav >
      <ul >
        <a
          // className={styles.menuItem}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button className={styles.bellButton} aria-label="Notifications">
            <BellRing size={32} style={{marginRight:"18px",marginLeft:"10px",color:"white"}}  />
            {notifications.some((n) => !n.isRead) && <span className={styles.notificationDot}></span>}
          </button>

          {/* Notification Dropdown */}
          {isHovered && (
            <div className={styles.dropdownMenu}>
              <div className={styles.header}>
                <h3>Notifications</h3>
                <div className={styles.headerActions}>
                  {/* <button onClick={() => setShowFilterMenu(!showFilterMenu)} className={styles.filterButton}>
                    <Filter size={20} />
                  </button> */}
                  <button onClick={markAllAsRead} className={styles.markAllRead}>
                    Mark all read
                  </button>
                </div>
              </div>

              {/* Filter Menu */}
              {/* {showFilterMenu && (
                <div className={styles.filterMenu}>
                  <button
                    onClick={() => setActiveFilter("all")}
                    className={activeFilter === "all" ? styles.active : ""}
                  >
                    {activeFilter === "all" && <Check size={16} />}
                    All Notifications
                  </button>
                  {Object.entries(categories).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => setActiveFilter(key)}
                      className={activeFilter === key ? styles.active : ""}
                    >
                      {value.icon} {value.label}
                    </button>
                  ))}
                </div>
              )} */}

              {/* Notification List */}
              <div className={styles.notificationList}>
                {Object.entries(groupedNotifications).map(([date, notifications]) => (
                  <div key={date} className={styles.notificationGroup}>
                    <h4>{date}</h4>
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`${styles.notificationItem} ${notification.isRead ? styles.read : styles.unread}`}
                      >
                        <span className={styles.notificationIcon}>{categories[notification.type]?.icon}</span>
                        <div>
                          <p>{notification.message}</p>
                          <span className={styles.time}>{new Date(notification.time).toLocaleTimeString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </a>
      </ul>
    </nav>
  );
};

export default NavigationMenu;
