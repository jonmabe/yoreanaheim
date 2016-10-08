import React from 'react';  
import { Link } from 'react-router'

export default class EditionItem extends React.Component {  
	constructor(props){
		super(props);
	}
    render() {    
         return <a href={`${this.props.edition.pdf}`} target='_blank'>{this.props.edition.name}</a>;
        } 
}