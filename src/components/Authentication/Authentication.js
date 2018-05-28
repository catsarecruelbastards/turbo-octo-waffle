import { Component } from 'react';

import oAuthConfig from '../../config/google';

class Authentication extends Component {
  state = {
    token: null
  };

  render() {
    return this.props.children(this.state);
  }
}

export default Authentication;
