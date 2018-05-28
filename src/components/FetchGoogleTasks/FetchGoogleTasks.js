import React from 'react';

import Fetch from '../Fetch/Fetch';

import apiEndpoints from '../../config/google';

const FetchGoogleTasks = props => (
  <Fetch url={/* API ENDPOINT */} headers={{ Authorization: `Bearer ${/* AUTH TOKEN */}`}}>{data => data && props.children(data)}</Fetch>
);

export default FetchGoogleTasks;
