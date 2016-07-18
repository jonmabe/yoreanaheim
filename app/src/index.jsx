import React from 'react';  
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import App from './components/App.jsx';
import Publication from './components/Publication.jsx';

const app = document.createElement('div');
document.body.appendChild(app);

const Index = React.createClass({
  render() {
    return <h1>??</h1>
  }
})

const NotFound = React.createClass({
  render() {
    return <h2>Not found</h2>
  }
})

render((
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Index} />
			<Route path="publication/:id" component={Publication} />
			<Route path="*" component={NotFound} />
		</Route>
	</Router>
), app);