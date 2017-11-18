import React from 'react';
import { Link } from 'react-router'
import moment from 'moment-timezone';

export default class EditionItem extends React.Component {
	constructor(props){
		super(props);
	}
  render() {
		var d = moment(this.props.edition.edition_date);
		var editionName = d.tz('UTC').format('MMMM Do, YYYY (dddd)');
  	return <a href={`${this.props.edition.pdf}`} target='_blank' className="list-group-item d-flex align-items-center list-group-item-action justify-content-between">
			{editionName}
			<span className="badge badge-primary badge-pill">{this.props.edition.pages.toLocaleString()}</span>
		</a>;
  }
}
