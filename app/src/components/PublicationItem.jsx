import React from 'react';  
export default class PublicationItem extends React.Component {  
	constructor(props){
		super(props);
	}
    render() {    
         return <a href={'/publication/' + this.props.publication.id}>{this.props.publication.name}</a>;
        } 
}