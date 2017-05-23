import React from 'react';
import { Link } from 'react-router'

export default class EditionItem extends React.Component {
	constructor(props){
		super(props);
	}
  render() {
  	return <a href={`${this.props.edition.pdf}`} target='_blank' className="list-group-item list-group-item-action justify-content-between">
			{this.props.edition.name}
			<span className="badge badge-default badge-pill">{this.props.edition.pages.toLocaleString()}</span>
		</a>;
  }
}
