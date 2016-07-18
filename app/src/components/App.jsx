import React from 'react';  
import $ from 'jquery';
import Publications from './Publications.jsx';

require('./App.scss');

export default class App extends React.Component {  
	constructor(props){
		super(props);
		this.state = {
			publications: []
		};
	}
	componentDidMount() {
		this.serverRequest = $.get('/api/publications', function (result) {
			console.log(2,result);
			var publications = result;
			this.setState({ publications: publications });
		}.bind(this));
	}

	componentWillUnmount() {
		this.serverRequest.abort();
	}

  render() {
  	console.log('render', this);
    return <Publications publications={this.state.publications} />;
  }
}