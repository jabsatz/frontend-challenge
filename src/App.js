import './App.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadChampions } from './redux/reducer';

const mapStateToProps = state => ({
	loading: state.loadingChampions,
	champions: state.champions,
});

const mapDispatchToProps = {
	initialLoad: loadChampions,
};

class App extends Component {
	static propTypes = {
		loading: PropTypes.bool,
		champions: PropTypes.arrayOf(
			PropTypes.shape({
				code: PropTypes.string,
				dateOfBirth: PropTypes.string,
				driverId: PropTypes.string,
				familyName: PropTypes.string,
				givenName: PropTypes.string,
				nationality: PropTypes.string,
				permanentNumber: PropTypes.string,
				url: PropTypes.string,
				year: PropTypes.number,
			})
		),
		initialLoad: PropTypes.func,
	};

	componentDidMount() {
		this.props.initialLoad(2005, 11);
	}

	render() {
		const { loading, champions } = this.props;

		return (
			<div className="App">
				{loading ? (
					<div className="App-loading" />
				) : (
					<ul className="App-list">
						{champions.map(champion => (
							<li key={champion.year}>
								<span className="App-link">{champion.year}</span> champion:{' '}
								<a className="App-link" href={champion.url}>
									{champion.givenName} {champion.familyName}
								</a>
							</li>
						))}
					</ul>
				)}
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
