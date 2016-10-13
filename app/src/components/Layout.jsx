import React from 'react';
import { browserHistory, Router, Route, IndexRoute, Link, withRouter } from 'react-router'
import PublicationItem from './PublicationItem.jsx';

export default class Layout extends React.Component {  
	constructor(props){
		super(props);
		this.state = {
		};
	}
    
    componentWillMount() {
        const typekitScript = document.createElement('script');
        typekitScript.src = 'https://use.typekit.net/knf7vtt.js';
        typekitScript.async = true;
        document.body.appendChild(typekitScript);
    }

	componentDidMount() {
	}

	componentWillUnmount() {
	}

    render() {    
         return (
            <div className="container container-fluid">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="row">
                            <h1 className="sr-only">Yore Anaheim</h1>
                             <Link to={'/'}><img className="img-fluid" src={require('../assets/header-685x518.jpg')} /></Link>
                        </div>
                        <div className="row">
                            <ul className="nav">
                                <li className="nav-item">
                                    <Link to={'/'} className="nav-link">Publications</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/about'} className="nav-link">About</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        {this.props.children}
                    </div>
                </div>
                <div className="row">&nbsp;</div>
                <div className="row">
                    <div className="col-lg-12 text-xs-center">
                        Copyright (c) 2016 Jason Schultz &amp; Jonathan Mabe
                    </div>
                </div>
            </div>
         )
    } 
}
