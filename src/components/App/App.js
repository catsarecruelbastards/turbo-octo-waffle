import React from 'react';

import Authentication from '../Authentication/Authentication';
import FetchGoogleTasks from '../FetchGoogleTasks/FetchGoogleTasks';

const App = props => (
  <Authentication>
    {auth =>
      auth && (
        <FetchGoogleTasks token={auth.token} /* date={} */>
          {tasks => tasks && <ul>{tasks.map(task => <li>{task}</li>)}</ul>}
        </FetchGoogleTasks>
      )
    }
  </Authentication>
);

export default App;
