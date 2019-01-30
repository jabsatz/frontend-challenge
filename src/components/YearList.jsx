import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadYearWinners } from 'redux/reducer';
import { ListItem, List } from 'components/List';
import { AnchorLink } from 'components/Link'
import { Page } from 'components/Page';

const mapStateToProps = (state, ownProps) => ({
	loading: state.loadingYearWinners,
	winners: state.yearWinners[ownProps.year] || [],
	champion: state.champions.find(champion => champion.year === parseInt(ownProps.year, 10)),
});

const mapDispatchToProps = {
	loadWinners: loadYearWinners,
};

export class YearList extends Component {
	static propTypes = {
		loading: PropTypes.bool,
		winners: PropTypes.arrayOf(
			PropTypes.shape({
				driverId: PropTypes.string,
				familyName: PropTypes.string,
				givenName: PropTypes.string,
				url: PropTypes.string,
				round: PropTypes.number,
			})
		),
		champion: PropTypes.shape({
			driverId: PropTypes.string,
			familyName: PropTypes.string,
			givenName: PropTypes.string,
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
		const { winners, year, loading, champion } = this.props;
		return (
			<Page title={`F1 ${year} Round Winners`} loading={loading} backButton>
				<List>
					{winners.map(winner => {
						const isChampion = champion.driverId === winner.driverId;
						return (
							<ListItem highlight={isChampion} key={winner.round}>
								Round {winner.round} Winner:{' '}
								<AnchorLink link={winner.url}>
									{winner.givenName} {winner.familyName}
								</AnchorLink>
							</ListItem>
						);
					})}
				</List>
			</Page>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(YearList);
