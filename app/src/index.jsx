import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import App from './components/App.jsx';
import Publication from './components/Publication.jsx';
import Publications from './components/Publications.jsx';
import PublicationYears from './components/PublicationYears.jsx';
import PublicationAbout from './components/PublicationAbout.jsx';
import About from './components/About.jsx';

import ReactGA from 'react-ga';

const app = document.createElement('div');
app.setAttribute('id', 'app');
document.body.appendChild(app);

ReactGA.initialize('UA-100353165-1');

function logPageView() {
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
}

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
	<Router history={browserHistory} onUpdate={logPageView}>
		<Route path="/" component={App}>
			<IndexRoute component={Publications} />
			<Route path="/about" component={About} />
			<Route path="/publication/(:name_):id(/year-:year-month-:month)" component={Publication} />
			<Route path="/publication/(:name_):id(/year-:year)" component={Publication} />
			<Route path="/publication/(:name_):id/page-:page" component={Publication} />
			<Route path="/publication/(:name_):id/years" component={PublicationYears} />
			<Route path="/publication/(:name_):id/about" component={PublicationAbout} />
		</Route>
	</Router>
), document.getElementById('app'));
