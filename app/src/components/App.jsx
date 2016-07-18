import React from 'react';
import { Link } from 'react-router'
import $ from 'jquery';

require('./App.scss');

export default class App extends React.Component {  
  render() {
    return (
    	<div className="main">
				<Link to={'/'}>Publications</Link>
				{this.props.children}
    	</div>
    );
  }
}