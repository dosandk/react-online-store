import React, {useEffect, useState} from 'react';

// TODO: check react-way implementation
const NotificationManager = ({
 stackLimit = 3
}) => {
  const [limit, setLimit] = useState(stackLimit);

  useEffect(() => {
    setLimit(stackLimit);
  }, [stackLimit]);

  return <div>NotificationManager</div>
};

export default NotificationManager;
