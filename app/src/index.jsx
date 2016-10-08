import React from 'react';  
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import App from './components/App.jsx';
import Publication from './components/Publication.jsx';
import Publications from './components/Publications.jsx';

const app = document.createElement('div');
app.setAttribute('id', 'app');
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
			<IndexRoute component={Publications} />
			<Route path="/publication/(:name_):id(/page-:page)" component={Publication} />
		</Route>
	</Router>
), document.getElementById('app'));