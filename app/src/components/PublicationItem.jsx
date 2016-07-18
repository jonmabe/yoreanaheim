import React from 'react';  
import { browserHistory, Router, Route, IndexRoute, Link, withRouter } from 'react-router'

export default class PublicationItem extends React.Component {  
	constructor(props){
		super(props);
	}
    render() {    
         return <Link to={`/publication/${this.props.publication.id}`}>{this.props.publication.name}</Link>;
        } 
}