import React from 'react';  
import Layout from './Layout.jsx';
import PublicationItem from './PublicationItem.jsx';

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
         	<Layout>
	         	<h2>Publications</h2>
	         	<ul>
	         		{this.state.publications.map(function(pub){
	         			return <li key={`publication-${pub.id}`} ><PublicationItem publication={pub} /></li>;
	         		})}
	         	</ul>
         	</Layout>
         )
    } 
}
