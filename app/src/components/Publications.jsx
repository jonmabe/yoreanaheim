import React from 'react';
import PublicationItem from './PublicationItem.jsx';
import { browserHistory, Router, Route, IndexRoute, Link, withRouter } from 'react-router'

export default class Publications extends React.Component {
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
         	<div>
	         	<h2 className="display-3">Publications</h2>
						<ol className='breadcrumb'>
							<li key='bc-o' className='breadcrumb-item active'>Publications</li>
						</ol>
	         	<div className="list-group">
	         		{this.state.publications.map(function(pub){
					 		 	var key = `publication-${pub.id}`;
	         			return <PublicationItem publication={pub} key={key} />;
	         		})}
	         	</div>
         	</div>
         )
    }
}
