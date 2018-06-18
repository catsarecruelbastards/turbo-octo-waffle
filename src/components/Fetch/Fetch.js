import { Component } from 'react';

class FetchError extends Error {
  constructor(message, response) {
    super(message);
    this.response = response;
  }
  static name = 'FetchError';
}

class Fetch extends Component {
  static defaultProps = {
    options: {},
    responseType: 'json',
    // url: null,
    onError: () => {},
    onSuccess: () => {}
  };

  controller = null;

  state = {
    data: null,
    error: null
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    const { data, error } = this.state;
    if (data == null && error == null) {
      this.abortFetch();
      this.fetchData();
    }
  }

  componentWillUnmount() {
    this.abortFetch();
  }

  abortFetch = () => this.controller && this.controller.abort();

  // clearError = () => this.setState({ error: null });

  fetchData = () => {
    const { url, options, responseType } = this.props;

    this.controller = new AbortController();
    const { signal } = this.controller;

    fetch(url, { ...options, signal })
      .then(response => {
        if (response.ok) {
          return ['arrayBuffer', 'blob', 'formData', 'json', 'text'].includes(
            responseType
          )
            ? response[responseType]()
            : response.body.getReader();
        }
        throw new FetchError(response.statusText, response);
      })
      .then(data => this.setState({ data }, () => this.props.onSuccess(data)))
      .catch(error => {
        switch (error.name) {
          case 'AbortError': // Fetch abortd (instanceof DOMException)
            break;
          case 'FetchError': // Fetch response not 200 OK
            break;
          case 'SyntaxError': // Error parsing response
            break;
          case 'TypeError': // Network error or CORS problem
          /* fall through */
          default:
            this.setState({ error }, () => this.props.onError(error));
        }
      });
  };

  render() {
    return this.props.children(this.state);
  }
}

export default Fetch;
