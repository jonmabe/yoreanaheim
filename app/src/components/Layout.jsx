import React from 'react';
import { browserHistory, Router, Route, IndexRoute, Link, withRouter } from 'react-router'
import PublicationItem from './PublicationItem.jsx';

export default class Layout extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data: {
				sumPages: '#'
			}
		};
	}

  componentWillMount() {
      const typekitScript = document.createElement('script');
      typekitScript.src = 'https://use.typekit.net/knf7vtt.js';
      typekitScript.async = true;
      document.body.appendChild(typekitScript);
  }

	componentDidMount() {
		this.countRequest = $.get('/api/publication/sumPages', function (result) {
			this.setState({ data: result });
		}.bind(this));
	}

	componentWillUnmount() {
	}

  render() {
    return (
        <div className="container container-fluid" style={{marginTop:'10px'}}>
            <div className="row">
                <div className="col-md-4">
                    <div className="row" style={{marginBottom:'10px'}}>
		                    <div className="col">
                          <h1 className="sr-only">Yore Anaheim</h1>
                           <Link to={'/'}><img className="img-fluid" src={require('../assets/header-685x518.jpg')} /></Link>
											 </div>
                    </div>
                    <div className="row">
		                    <div className="col">
                          <div className="list-group">
                              <Link to={'/'} className="list-group-item list-group-item-action">
																<div className="d-flex w-100 justify-content-between">
																	<h5 className="mb-1">Publications</h5>
																	<small className="text-muted"></small>
																</div>
																<p className="mb-1">Hosting {this.state.data.sumPages.toLocaleString()} pages of historical Anaheim newspapers</p>
															</Link>
                              <Link to={'/about'} className="list-group-item list-group-item-action">
																<div className="d-flex w-100 justify-content-between">
																	<h5 className="mb-1">About</h5>
																	<small className="text-muted"></small>
																</div>
																<p className="mb-1">Learn more about this site</p>
															</Link>

                          </div>
												</div>
                    </div>
                </div>
                <div className="col-md-8">
                    {this.props.children}
                </div>
            </div>
            <div className="row">&nbsp;</div>
            <div className="row">
                <div className="col-12 text-xs-center">
                    Copyright &copy; 2016 Jason Schultz, <a href="http://jonmabe.com" target="_blank">Jon Mabe</a>, <a href="https://www.facebook.com/Chris-Maya-Art-Gallery-169971276422543/" target="_blank">Chris Maya</a>
                </div>
            </div>
        </div>
     )
  }
}
