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
		var pageLength = 1;
		var pageCount = this.state.data.editions.count / pageLength;
		var pageControl = null;
		var slug = slugify(this.state.data.publication.name.replace('_', ' ')).toLowerCase();

		if(Math.floor(pageCount) > 0 ){
			for(var i=0;i<pageCount;i++){
				var itemClassNames = 'page-item';
				if(i+'' == this.props.params.page)
					itemClassNames += ' active';
				pages.push(<li key={i} className={itemClassNames}><a className="page-link" href={`/publication/${slug}_${this.state.data.publication.id}/page-${i}`}>{i+1}</a></li>);
			}
			pageControl = <nav aria-label="Page navigation"><ul className="pagination">{pages}</ul></nav>;
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