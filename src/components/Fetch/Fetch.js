import { Component } from 'react';

class Fetch extends Component {
  controller = null;

  state = {
    data: null,
    error: null
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {}

  componentWillUnmount() {}

  fetchData = () => {
    const { url, headers } = this.props;
    this.controller = new AbortController();
    const { signal } = this.controller;

    fetch(url, { headers, signal })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error('Network response was not ok.');
      })
      .then(data => this.setState({ data }))
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    return this.props.children(this.state);
  }
}

export default Fetch;
