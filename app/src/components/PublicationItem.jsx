import React from 'react';
import { browserHistory, Router, Route, IndexRoute, Link, withRouter } from 'react-router'
import slugify from 'slugify';

export default class PublicationItem extends React.Component {  
	constructor(props){
		super(props);
	}
    render() {
         var cleanUrl = slugify(this.props.publication.name.replace('_', ' ')).toLowerCase();
         return <Link to={`/publication/${cleanUrl}_${this.props.publication.id}`}>{this.props.publication.name}</Link>;
        } 
}