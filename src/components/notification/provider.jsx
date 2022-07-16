import {createContext, useCallback, useContext, useState} from "react";
import {NotificationContainer} from "./container/container";

const NotificationContext = createContext('notification');
const {Provider} = NotificationContext;

export const NotificationsProvider = ({children}) => {
  const [messageObj, setNotification] = useState({ value: ''});

  const notify = useCallback((newMessage = '') => {
    setNotification({value: newMessage});
  }, []);

  return (
    <Provider value={{ messageObj, notify }}>
      {children}
      <NotificationContainer stackLimit={3} duration={4000}/>
    </Provider>
  );
}

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (context === undefined) {
    throw new Error('"useNotification" must be used within a "NotificationsProvider"');
  }

  return context;
}
