import React from 'react';
import $ from 'jquery';
import Publications from './Publications.jsx';
import Publication from './Publication.jsx';

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
			var publications = result;
			this.setState({ publications: publications });
		}.bind(this));
	}

	componentWillUnmount() {
		this.serverRequest.abort();
	}

  render() {
    return (
    	<div className="main">
    		<Publications publications={this.state.publications} />
    	</div>
    );
  }
}