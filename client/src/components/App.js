import React, {useState} from 'react';

import '../App.css';

import PokemonList from './PokemonList';

import Home from './Home';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Pokemon from './Pokemon';
import Trainers from './Trainers'




const App = () => {

	return (
		<Router>
			<div className='App'>
				<header className='App-header'>
					
					<h1 className='App-title'>Welcome to the React Pokemon API</h1>
					<Link className='link' to='/'>
						Home
					</Link>
					<Link className='link' to='/trainers'>
						Trainers
					</Link>
					<Link className='link' to='/pokemon/page/0'>
						Pokemon
					</Link>
				</header>
				<br />
				<br />
				<div className='App-body'>
					<Route exact path='/' component={Home} />
					
					<Route exact path='/pokemon/page/:pagenum' component={PokemonList} />
					<Route exact path='/trainers' component={Trainers} />
					<Route exact path='/pokemon/:id' component={Pokemon} />
					
          
				</div>
			</div>
		</Router>
	);
};

/*<Route exact path='/comics/page/:page' component={ComicList} />
					<Route exact path='/comics/:id' component={Comic} />
          <Route exact path='/series/page/:page' component={SeriesList} />
					<Route exact path='/series/:id' component={Series} />
					<Route exact path='/characters/page/:page' component={CharacterList} />
*/
export default App;
