import React from 'react';  
import PublicationItem from './PublicationItem.jsx';

export default class Publications extends React.Component {  
	constructor(props){
		super(props);
	}
    render() {    
    	console.log(1.1, this.props);
         return (
         	<div>
	         	<h1>Publications</h1>
	         	<ul>
	         		{this.props.publications.map(function(pub){
	         			return <li key='publication-{pub.id}' ><PublicationItem publication={pub} /></li>;
	         		})}
	         	</ul>
         	</div>
         )
    } 
}

Publications.defaultProps = { publications: [] };