import React from 'react';

import Fetch from '../Fetch/Fetch';

import apiEndpoints from '../../constants/google';

const GoogleTasksAPI = ({ children, token, url }) => {
  <Fetch
    url={url}
    options={{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }}
  >
    {state => children(state)}
  </Fetch>;
};

export default GoogleTasksAPI;
