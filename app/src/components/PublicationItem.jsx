import React from 'react';
import { browserHistory, Router, Route, IndexRoute, Link, withRouter } from 'react-router'
import slugify from 'slugify';

export default class PublicationItem extends React.Component {
	constructor(props){
		super(props);
	}
  render() {
     var slug = slugify(this.props.publication.name.replace('_', ' ')).toLowerCase();
		 var link = `/publication/${slug}_${this.props.publication.id}/years`;
     return <Link to={link} className="list-group-item list-group-item-action justify-content-between" >
			 	{this.props.publication.name}
			 	<span className="badge badge-default badge-pill">{this.props.publication.count}</span>
		 </Link>;
  }
}
