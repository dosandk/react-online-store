import {useEffect} from 'react';

import './notification.css';

const NotificationMessage = ({message, duration, onDelete}) => {
  useEffect(() => {
    const timerId = setTimeout(() => {
      onDelete();
    }, duration);

    return () => {
      clearTimeout(timerId);
    };
  }, [duration, onDelete]);

  return (
    <div className="notification success" style={{"--value": `${duration}ms`}}>
      <div className="timer"/>
      <div className="inner-wrapper">
        <div className="notification-body">
          <i className="bi bi-check-circle"/>
          {message}
        </div>
      </div>
    </div>
  )
};

export default NotificationMessage;
