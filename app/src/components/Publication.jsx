import React from 'react';
import EditionItem from './EditionItem.jsx';
import slugify from 'slugify';

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
				}
			}
		};
	}
	componentDidMount() {
		var page = '0';
		if(typeof this.props.params.page != 'undefined' && this.props.params.page)
			page = this.props.params.page;
		this.editionsRequest = $.get('/api/publication/'+ this.props.params.id +'/page/'+ page, function (result) {
			this.setState({ data: result });
		}.bind(this));
	}

	componentWillUnmount() {
		this.editionsRequest.abort();
	}
    render() {
		var pages = [];
		var pageLength = 25;
		var pageCount = this.state.data.editions.count / pageLength;
		var pageControl = null;
		var slug = slugify(this.state.data.publication.name.replace('_', ' ')).toLowerCase();
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

         return (
         	<div>
         		<h1>{this.state.data.publication.name}</h1>
				{pageControl}
         		<ul>
	         		{this.state.data.editions.rows.map(function(ed){
	         			return <li key={`editions-${ed.id}`} ><EditionItem edition={ed} /></li>;
	         		})}
         		</ul>
         	</div>
		 );
    }
}
