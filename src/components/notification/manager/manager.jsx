import {useEffect, useState} from 'react';

import NotificationMessage from "../component/notification";

import "./manager.css";

const getId = () => Math.random().toString(36).substring(2, 9);

const NotificationManager = ({
  stackLimit = 0,
  messageObj = {},
  duration = 0
}) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!messageObj.value.length) return;

    setNotifications(prevNotifications => {
      const newNotifications = prevNotifications.length === stackLimit
        ? prevNotifications.slice(1)
        : prevNotifications;

      return [...newNotifications, {
        message: messageObj.value,
        id: getId()
      }];
    });
  }, [messageObj, stackLimit]);


  const deleteNotification = id => {
    setNotifications((prevNotifications) => {
      return prevNotifications.filter(notification => notification.id !== id);
    });
  };

  return (
    <div className="notification-manager">
      {
        notifications.map(({id, message}) => {
          return <NotificationMessage
            key={id}
            onDelete={() => deleteNotification(id)}
            message={message}
            duration={duration}/>
        })
      }
    </div>
  );
};

export default NotificationManager;
