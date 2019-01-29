import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const mapStateToProps = state => ({
	loading: state.loadingChampions,
	champions: state.champions,
});

export class ChampionsList extends Component {
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
	};

	static defaultProps = {
		loading: true,
		champions: [],
	};

	render() {
		const { loading, champions } = this.props;
		return (
			<div>
				{loading ? (
					<div className="App-loading" />
				) : (
					<ul className="App-list">
						{champions.map(champion => (
							<li key={champion.year}>
								<Link to={`/${champion.year}`} className="App-link">
									{champion.year}
								</Link>{' '}
								champion:{' '}
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

export default connect(mapStateToProps)(ChampionsList);
