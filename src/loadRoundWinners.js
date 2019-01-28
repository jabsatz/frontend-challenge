export default async year => {
	const rounds = await fetch(`http://ergast.com/api/f1/${year}.json`).then(response => response.json());

	const roundAmount = rounds.MRData.RaceTable.Races.length;

	const winnersQuery = Array(roundAmount)
		.fill()
		.map((_, position) => {
			const round = position + 1;
			return fetch(`http://ergast.com/api/f1/${year}/${round}/results/1.json`)
				.then(response => response.json())
				.then(json => ({ round, ...json.MRData.RaceTable.Races[0].Results[0].Driver }));
		});

	return Promise.all(winnersQuery);
};
