import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadYearWinners } from 'redux/reducer';
import { Link } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => ({
	loading: state.loadingYearWinners,
	winners: state.yearWinners[ownProps.year] || [],
	champion: state.champions.find(champion => champion.year == ownProps.year),
});

const mapDispatchToProps = {
	loadWinners: loadYearWinners,
};

export class YearList extends Component {
	static propTypes = {
		loading: PropTypes.bool,
		winners: PropTypes.arrayOf(
			PropTypes.shape({
				code: PropTypes.string,
				dateOfBirth: PropTypes.string,
				driverId: PropTypes.string,
				familyName: PropTypes.string,
				givenName: PropTypes.string,
				nationality: PropTypes.string,
				permanentNumber: PropTypes.string,
				url: PropTypes.string,
				round: PropTypes.number,
			})
		),
		champion: PropTypes.shape({
			code: PropTypes.string,
			dateOfBirth: PropTypes.string,
			driverId: PropTypes.string,
			familyName: PropTypes.string,
			givenName: PropTypes.string,
			nationality: PropTypes.string,
			permanentNumber: PropTypes.string,
			url: PropTypes.string,
			year: PropTypes.number,
		}),
		year: PropTypes.string,
		loadWinners: PropTypes.func,
	};

	componentDidMount() {
		const { winners, loadWinners, year } = this.props;
		winners.length === 0 && loadWinners(year);
	}

	render() {
		const { winners, loading, champion } = this.props;
		return (
			<div>
				{loading ? (
					<div className="App-loading" />
				) : (
					<>
						<Link className="App-link" to="/">
							Go Back
						</Link>
						<ul className="App-list">
							{winners.map(winner => {
								const isChampion = champion.driverId === winner.driverId;
								return (
									<li className={isChampion ? 'App-list-champion' : undefined} key={winner.round}>
										Round {winner.round} Winner:{' '}
										<a className="App-link" href={winner.url}>
											{winner.givenName} {winner.familyName}
										</a>
									</li>
								);
							})}
						</ul>
					</>
				)}
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(YearList);
