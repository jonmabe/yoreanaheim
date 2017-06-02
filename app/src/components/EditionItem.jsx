import React from 'react';
import { Link } from 'react-router'
import dateFormat from 'dateformat';

export default class EditionItem extends React.Component {
	constructor(props){
		super(props);
	}
  render() {
		var editionName = dateFormat(his.props.edition.edition_date.replace('Z', ''), 'mmmm dd, yyyy (dddd)');
  	return <a href={`${this.props.edition.pdf}`} target='_blank' className="list-group-item list-group-item-action justify-content-between">
			{editionName}
			<span className="badge badge-default badge-pill">{this.props.edition.pages.toLocaleString()}</span>
		</a>;
  }
}
