import React from 'react';
import '../App.css';

const Home = () => {
	return (
		<div>
			<p>
				This is a React application that utilizes the Pokemonl API. Start by clicking on of the buttons above
			</p>

			<p className='hometext'>
				The application queries 1 of Pokemon's end-points:{' '}
				<a rel='noopener noreferrer' target='_blank' href='http://api.tvmaze.com/shows'>
				https://pokeapi.co/api/v2/pokemon
				</a>{' '}
				
			</p>
		</div>
	);
};

export default Home;
