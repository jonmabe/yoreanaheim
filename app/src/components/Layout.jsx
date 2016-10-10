import React from 'react';
import PublicationItem from './PublicationItem.jsx';

export default class Layout extends React.Component {  
	constructor(props){
		super(props);
		this.state = {
		};
	}
    
    componentWillMount() {
        const script = document.createElement("script");

        script.src = "https://use.typekit.net/knf7vtt.js";
        script.async = true;
        document.body.appendChild(script);

        try{Typekit.load({ async: true });}catch(e){}
    }

	componentDidMount() {
	}

	componentWillUnmount() {
		this.serverRequest.abort();
	}
    render() {    
         return (
         	<div className="tk-letter-gothic-std">
                <div className="header">
                    <h1>Yore Anaheim</h1>
                    <img src={require('../assets/header-685x518.jpg')} />
                </div>
                <div className="content">
                    {this.props.children}
                </div>
                <div className="footer">
                    Copyright (c) 2016 Jason Schultz &amp; Jonathan Mabe
                </div>
         	</div>
         )
    } 
}
