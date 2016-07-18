import React from 'react';  
export default class Publication extends React.Component {  
	constructor(props){
		super(props);
	}
    render() {
    	console.log('here');
         return 
         	<div>
         		<h1>{this.props.publication.name}</h1>
         		<ul>
         			<li>some stuff</li>
         		</ul>
         	</div>
        } 
}