import React from 'react';  
import EditionItem from './EditionItem.jsx';

export default class Publication extends React.Component {  
	constructor(props){
		super(props);
		this.state = {
			data: {
				publication: {
					name: ''
				},
				editions: []
			}
		};
	}
	componentDidMount() {
		this.editionsRequest = $.get('/api/publication/'+ this.props.params.id, function (result) {
			this.setState({ data: result });
		}.bind(this));
	}

	componentWillUnmount() {
		this.editionsRequest.abort();
	}
    render() {
         return (
         	<div>
         		<h1>{this.state.data.publication.name}</h1>
         		<ul>
	         		{this.state.data.editions.map(function(ed){
	         			return <li key={`editions-${ed.id}`} ><EditionItem edition={ed} /></li>;
	         		})}
         		</ul>
         	</div>
		 );
    } 
}