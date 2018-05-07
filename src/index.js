import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';

const App = () => <div>Hello World</div>;

ReactDOM.render(<App />, document.getElementById('app'));

export default hot(module)(App);
