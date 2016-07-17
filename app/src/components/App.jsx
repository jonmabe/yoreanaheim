import React from 'react';  
import $ from 'jquery';
import Publications from './Publications.jsx';

require('./App.scss');

export default class App extends React.Component {  

	componentDidMount() {
		this.serverRequest = $.get('/api/publications', function (result) {
			var publications = result;
			this.setState({ publications: publications });
		}.bind(this));
	}

	componentWillUnmount() {
		this.serverRequest.abort();
	}

  render() {
    return <Publications />;
  }
}