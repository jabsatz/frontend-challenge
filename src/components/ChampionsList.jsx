import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, ListItem } from 'components/List';
import { AnchorLink, AppLink } from 'components/Link'
import { Page } from 'components/Page';

const mapStateToProps = state => ({
	loading: state.loadingChampions,
	champions: state.champions,
});

export class ChampionsList extends Component {
	static propTypes = {
		loading: PropTypes.bool,
		champions: PropTypes.arrayOf(
			PropTypes.shape({
				driverId: PropTypes.string,
				familyName: PropTypes.string,
				givenName: PropTypes.string,
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
			<Page title="F1 World Champions" loading={loading}>
				<List>
					{champions.map(champion => (
						<ListItem key={champion.year}>
							<AppLink to={`/${champion.year}`}>
								{champion.year}
							</AppLink>
							{' - '}
							<AnchorLink link={champion.url}>
								{champion.givenName} {champion.familyName}
							</AnchorLink>
						</ListItem>
					))}
				</List>
			</Page>
		);
	}
}

export default connect(mapStateToProps)(ChampionsList);
