import React from 'react';
import YearItem from './YearItem.jsx';
import slugify from 'slugify';
import dateFormat from 'dateformat';
import { browserHistory, Router, Route, IndexRoute, Link, withRouter } from 'react-router'

export default class PublicationYears extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data: {
				publication: {
					name: ''
				},
				years: []
			}
		};
	}
	componentDidMount() {
		this.yearsRequest = $.get('/api/publication/'+ this.props.params.id +'/years', function (result) {
			this.setState({ data: result });
		}.bind(this));
	}

	componentWillUnmount() {
		this.yearsRequest.abort();
	}
  render() {
		var yearHtml = [];
		var breadcrumbs = [];
		var slug = slugify(this.state.data.publication.name.replace('_', ' ') + '_' + this.state.data.publication.id).toLowerCase();
		var title = this.state.data.publication.name;
		var yearRegex = /\d{4}/g;

		document.title = title + ' | Yore Anaheim';

		breadcrumbs.push(<li key='bc-0' className='breadcrumb-item'><Link to="/">Publications</Link></li>)
		breadcrumbs.push(<li key='bc-1' className='breadcrumb-item active'>{this.state.data.publication.name}</li>)

	   return (
	   	<div>
	   		<h1 className="display-3">{title}</h1>
				<ol className='breadcrumb'>
					{breadcrumbs}
				</ol>
	   		<ul className="list-group">
	     		{this.state.data.years.map(function(yearItem){
						var yearMatch = yearRegex.exec(yearItem.dateTrunc);
						yearItem.year = yearMatch[0]; //dateFormat(yearItem.dateTrunc.replace('Z', ''), 'yyyy');
						var key = `year-${yearItem.year}`;
	     			return <YearItem slug={slug} yearItem={yearItem} key={key} />;
	     		})}
	   		</ul>
	   	</div>
		);
  }
}
