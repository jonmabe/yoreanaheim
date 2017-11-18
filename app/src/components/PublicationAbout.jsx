import React from 'react';
import YearItem from './YearItem.jsx';
import slugify from 'slugify';
import { browserHistory, Router, Route, IndexRoute, Link, withRouter } from 'react-router'
import moment from 'moment-timezone';

export default class PublicationAbout extends React.Component {
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
		var about = this.state.data.publication.about;

		document.title = title + ' - About | Yore Anaheim';

		breadcrumbs.push(<li key='bc-0' className='breadcrumb-item'><Link to="/">Publications</Link></li>)
		breadcrumbs.push(<li key='bc-1' className='breadcrumb-item' ><Link to={`/publication/${slug}/years`} >{this.state.data.publication.name}</Link></li>)
		breadcrumbs.push(<li key='bc-2' className='breadcrumb-item active'>About</li>)

	   return (
	   	<div>
	   		<h1 className="display-3">{title}</h1>
			<ol className='breadcrumb'>
				{breadcrumbs}
			</ol>
			<p><div dangerouslySetInnerHTML={{__html: about}} /></p>
		</div>
		);
  }
}
