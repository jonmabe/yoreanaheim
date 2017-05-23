import React from 'react';
import EditionItem from './EditionItem.jsx';
import MonthItem from './MonthItem.jsx';
import PublicationItem from './PublicationItem.jsx';
import YearItem from './YearItem.jsx';
import slugify from 'slugify';
import dateFormat from 'dateformat';
import { browserHistory, Router, Route, IndexRoute, Link, withRouter } from 'react-router'

export default class Publication extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data: {
				publication: {
					name: ''
				},
				editions: {
					rows: [],
					count: 0
				},
				months: []
			}
		};
	}
	componentDidMount() {
		this.generateData(this.props.params);
	}
	componentWillUpdate() {
	}
	componentWillUnmount() {
		this.editionsRequest.abort();
	}
	componentWillReceiveProps(nextProps){
		if (typeof this.props.params.month !== typeof nextProps.params.month || this.props.params.month !== nextProps.params.month) {
			this.generateData(nextProps.params);
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
		return true;
	}
	generateData(params) {
		var page = '0';
		var year = '0';
		var month = null;

		if(typeof params.page != 'undefined' && params.page){
			page = params.page;
			this.editionsRequest = $.get('/api/publication/'+ params.id +'/page/'+ page, function (result) {
				this.setState({ data: result });
			}.bind(this));
		} else if (typeof params.month != 'undefined' && params.month) {
			year = params.year;
			month = params.month;
			this.editionsRequest = $.get('/api/publication/'+ params.id +'/year/'+ year +'/month/'+ month, function (result) {
				this.setState({ data: result });
			}.bind(this));
		} else if (typeof params.year != 'undefined' && params.year) {
			year = params.year;
			this.editionsRequest = $.get('/api/publication/'+ params.id +'/year/'+ year, function (result) {
				this.setState({ data: result });
			}.bind(this));
		}
	}

  render() {
		var slug = slugify(this.state.data.publication.name.replace('_', ' ') + '_' + this.state.data.publication.id).toLowerCase();
		var navigation = null;
		var breadcrumbs = [];
		var navItems = [];
		var title = this.state.data.publication.name;

		document.title = title + '| Yore Anaheim';

		/*
		var pageLength = 25;
		var pageCount = this.state.data.editions.count / pageLength;
		var maxPaging = 6;
		var pageLinks = 0;
		var currentPage = typeof this.props.params.page != 'undefined' ? parseInt(this.props.params.page) : 0;
		var firstPage = currentPage === 0 ? 0 : currentPage - 1;

		if(Math.floor(pageCount) > 0 ){
			pages.push(<li className={'page-item '+ (currentPage === 0 ? 'disabled' : '')}><a href={`/publication/${slug}_${this.state.data.publication.id}/page-${currentPage-1}`} className="page-link" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>)
			for(var i=firstPage;i<pageCount;i++){
				if(pageLinks == maxPaging) break;
				var itemClassNames = 'page-item';
				if(i == currentPage)
					itemClassNames += ' active';
				pages.push(<li key={i} className={itemClassNames}><a className="page-link" href={`/publication/${slug}_${this.state.data.publication.id}/page-${i}`}>{i+1}</a></li>);
				pageLinks++;
			}
			pages.push(<li className={'page-item '+ (''+(pageCount-1) == currentPage ? 'disabled' : '')}><a href={`/publication/${slug}_${this.state.data.publication.id}/page-${currentPage+1}`} className="page-link" aria-label="Previous"><span aria-hidden="true">&raquo;</span></a></li>)
			pageControl = <nav aria-label="Page navigation"><ul className="pagination pagination-sm">{pages}</ul></nav>;
		}
		*/

		breadcrumbs.push(<li key='bc-0' className='breadcrumb-item'><Link to="/">Publications</Link></li>)
		breadcrumbs.push(<li key='bc-1' className='breadcrumb-item' ><Link to={`/publication/${slug}/years`} >{this.state.data.publication.name}</Link></li>)

		if (typeof this.props.params.month == 'undefined' && this.state.data.months && (this.state.data.editions.count > 55)) {
			navigation = this.state.data.months.map(function(monthItem){
				monthItem.year = dateFormat(monthItem.dateTrunc.replace('Z', ''), 'yyyy');
				monthItem.month = dateFormat(monthItem.dateTrunc.replace('Z', ''), 'mmmm');
				var key = `month-${monthItem.month}`;
				return <MonthItem month={monthItem} slug={slug} key={key} />;
			});
			breadcrumbs.push(<li key='bc-2' className='breadcrumb-item active'>{this.props.params.year}</li>)
		} else {
			navigation = this.state.data.editions.rows.map(function(ed){
				var key = `editions-${ed.id}`;
				return <EditionItem edition={ed} key={key} />;
			});
			if(this.props.params.month){
				breadcrumbs.push(<li key='bc-2' className='breadcrumb-item'><Link to={`/publication/${slug}/year-${this.props.params.year}`}>{this.props.params.year}</Link></li>)
				breadcrumbs.push(<li key='bc-3' className='breadcrumb-item active text-capitalize'>{this.props.params.month}</li>)
			} else {
				breadcrumbs.push(<li key='bc-2' className='breadcrumb-item active'>{this.props.params.year}</li>)
			}
		}

    return (
     	<div>
     		<h1 className="display-3 text-capitalize">{title}</h1>
				<ol className='breadcrumb'>
					{breadcrumbs}
				</ol>
     		<ul className="list-group">
					{navigation}
     		</ul>
     	</div>
		 );
    }
}
