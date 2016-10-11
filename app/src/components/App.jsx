import React from 'react';
import { Link } from 'react-router'
import $ from 'jquery';
import Layout from './Layout.jsx';

require('./App.scss');

export default class App extends React.Component {  
  render() {
    return (
    	<Layout>
				{this.props.children}
    	</Layout>
    );
  }
}