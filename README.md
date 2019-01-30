## The Challenge

We'll use the [Ergast API](http://ergast.com/mrd/) to create a single page application that
presents a list that shows the F1 world champions starting from 2005 until
2015. Clicking on an item shows the list of the winners for every race for
the selected year. We also request to highlight the row when the winner
has been the world champion in the same season.

Feel free to create the UI the way you think it's best, just make sure it's clean, understandable and it's a single page application. The main goal here is to check your skills with CSS or whatever you use to style your project.

## Quick Start

1. `yarn install` or `npm install`
2. `yarn start` or `npm run start`
3. Project should open in `localhost:3000`

## How I did it

This project was bootstrapped using Create React App. Besides React, I'm using Redux for some state management (Although it is a very small project with only one reducer). I also used React Router to manage the routing.

I divided the files into 3 separate folders:
- The `redux` folder holds all the store configuration, and reducer and actions that I used. If it was a bigger project I would have used selectors as well, but I didn't see a necessity here
- The `queries` folder manages all the calls to the `Ergast API`. Both of them require a lot of simultaneous promise calls since there wasn't (or at least I couldn't find) a single endpoint that gave me all the data I needed.
- The `components` folder holds all React components and the SCSS for said components (I'm more comfortable using SCSS or styled-components than CSS).
