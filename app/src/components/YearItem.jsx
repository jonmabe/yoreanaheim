import React from 'react';
import { Link } from 'react-router'

export default class YearItem extends React.Component {
	constructor(props){
		super(props);
	}
    render() {
			var link = `/publication/${this.props.slug}/year-${this.props.yearItem.year}`;
     	return <Link to={link} className="list-group-item list-group-item-action justify-content-between">
			 	{this.props.yearItem.year}
			 	<span className="badge badge-default badge-pill">{this.props.yearItem.count.toLocaleString()}</span>
		 	</Link>
    }
}
