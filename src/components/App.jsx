import './App.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadChampions } from 'redux/reducer';
import ChampionsList from 'components/ChampionsList';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import YearList from 'components/YearList';

const mapDispatchToProps = {
	initialLoad: loadChampions,
};

class App extends Component {
	static propTypes = {
		initialLoad: PropTypes.func,
	};

	componentDidMount() {
		this.props.initialLoad(2005, 11);
	}

	render() {
		return (
			<Router>
				<div className="App">
					<div className="App-window">
						<h1 className="App-window-title">F1 Ergast App</h1>
						<Route path="/" exact render={() => <ChampionsList />} />
						<Route path="/:year" render={({ match }) => <YearList year={match.params.year} />} />
					</div>
				</div>
			</Router>
		);
	}
}

export default connect(
	null,
	mapDispatchToProps
)(App);
