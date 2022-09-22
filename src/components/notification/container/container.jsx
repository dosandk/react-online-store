// NOTE: container needed to render NotificationManager to portal
import {createPortal} from "react-dom";

import NotificationManager from "../manager/manager";
import {useNotification} from "../provider";
import {createElement} from "../utils/create-element";

import "./container.css";

const container = createElement('notification-container', 'notifications-container');

export const NotificationContainer = ({ stackLimit, duration }) => {
  const { messageObj } = useNotification();

  return createPortal(
    <NotificationManager
      stackLimit={stackLimit}
      messageObj={messageObj}
      duration={duration} />,
    container
  );
};
