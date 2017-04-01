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
            <div className="container container-fluid" style={{marginTop:'10px'}}>
                <div className="row">
                    <div className="col-4">
                        <div className="row" style={{marginBottom:'10px'}}>
				                    <div className="col">
	                            <h1 className="sr-only">Yore Anaheim</h1>
	                             <Link to={'/'}><img className="img-fluid" src={require('../assets/header-685x518.jpg')} /></Link>
													 </div>
                        </div>
                        <div className="row">
				                    <div className="col">
	                            <div className="list-group">
																	<Link to={'/'} className="list-group-item list-group-item-action">Publications</Link>
	                                <Link to={'/about'} className="list-group-item list-group-item-actionk">About</Link>
	                            </div>
														</div>
                        </div>
                    </div>
                    <div className="col-8">
                        {this.props.children}
                    </div>
                </div>
                <div className="row">&nbsp;</div>
                <div className="row">
                    <div className="col-12 text-xs-center">
                        Copyright &copy; 2016 Jason Schultz, Jonathan Mabe, Chris Maya
                    </div>
                </div>
            </div>
         )
    }
}
