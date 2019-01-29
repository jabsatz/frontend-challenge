export default (startingYear, amountOfYears) => {
	const requestedYears = Array(amountOfYears)
		.fill(startingYear)
		.map((baseYear, position) => baseYear + position);

	const championsQuery = requestedYears.map(year =>
		fetch(`https://ergast.com/api/f1/${year}/driverStandings/1.json`)
			.then(response => response.json())
			.then(json => ({
				year,
				...json.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver,
			}))
	);

	return Promise.all(championsQuery);
};
