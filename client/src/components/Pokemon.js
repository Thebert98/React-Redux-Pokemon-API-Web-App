import React, { useState, useEffect } from 'react';
import actions from '../actions';
import {useSelector} from 'react-redux';

import {useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
//import noImage from '../img/download.jpeg';
import { makeStyles, Card, CardContent, CardMedia, Typography, CardHeader } from '@material-ui/core';
import '../App.css';

const baseUrl = 'http://localhost:4000/pokemon';

const useStyles = makeStyles({
	card: {
		maxWidth: 550,
		height: 'auto',
		marginLeft: 'auto',
		marginRight: 'auto',
		borderRadius: 5,
		border: '1px solid #1e8678',
		boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
	},
	titleHead: {
		borderBottom: '1px solid #1e8678',
		fontWeight: 'bold'
	},
	grid: {
		flexGrow: 1,
		flexDirection: 'row'
	},
	media: {
		height: '100%',
		width: '100%'
	},
	button: {
		color: '#1e8678',
		fontWeight: 'bold',
		fontSize: 12
	}
});

const Pokemon = (props) => {
	const dispatch = useDispatch();
	const [selectedTrainer,setSelectedTrainer] = useState(undefined);
	const allTrainers = useSelector((state) => state.trainers)
	const [ pokemonData, setPokemonData ] = useState(undefined);
	const [ loading, setLoading ] = useState(true);
    //const [image, setImage] = useState(undefined);
   // const[comics,setComics] = useState(undefined);
   // const[description,setDescription] = useState(undefined);
	const classes = useStyles();
	const togglePokemon = (selectFlag,pokemon) =>{
		if(selectFlag=== 'catch') dispatch(actions.addToTeam(pokemon))
		else if(selectFlag ==='release') dispatch(actions.removeFromTeam(pokemon))
	  }
	useEffect(
		() => {
			console.log ("useEffect fired")
			async function fetchData() {
				for(let i = 0;i<allTrainers.length;i++){
					if(allTrainers[i].selected===true) setSelectedTrainer(allTrainers[i]);
				}
				try {
                     const url = baseUrl + '/'+props.match.params.id;
					 await fetch(url).then(response => response.json()).then(data => setPokemonData(data));
                    setLoading(false)
                    
					console.log(pokemonData)
                   // setImage(character.data.results[0].thumbnail.path + "." + character.data.results[0].thumbnail.extension )
                   // setComics(character.data.results[0].comics.items)
                    
                   // setDescription(character && character.data.results[0].description);
					//setLoading(false);
					
				} catch (e) {
					console.log(e);
				}
			}
			fetchData();
		},
		[ props.match.params.id ]
	);
	
    

	
	
	

	if (loading) {
		return (
			<div>
				<h2>Loading....</h2>
			</div>
		);
	} else {
		if(selectedTrainer === undefined){
			return (
				<Card className={classes.card} variant='outlined'>
					<CardHeader className={classes.titleHead} title={pokemonData.name} />
					<CardMedia
						className={classes.media}
						component='img'
						image={pokemonData.image}
						title='Pokemon image'
					/>
	
					<CardContent>
						<Typography variant='body2' color='textSecondary' component='span'>
							<div>
							
								<p>
									<dt className='title'>Types:</dt>
									{pokemonData.types && pokemonData.types.length >= 1 ? (
										<span>
											{pokemonData.types.map((type) => {
												
												if (pokemonData.types.length > 1) return <li key={type.type.name}>{type.type.name},</li>;
												return <dd key={type.type.name}>{type.type.name}</dd>;
												
											})}
										</span>
									) : (
										<dd>N/A</dd>
									)}
								</p>
								<br/>
								
								<p>
									<dt className='title'>Moves:</dt>
									
									{pokemonData.moves && pokemonData.moves.length >= 1 ? (
										
										<span>
											{pokemonData.moves.map((move) => {
												
												if (pokemonData.moves.length > 1) return <p key={move}>{move},</p>;
												return <dd key={move}>{move}</dd>;
												
											})}
										</span>
										
									) : (
										<dd>N/A</dd>
									)}
	
								</p>
								<p>
								<dt className='title'>Flavor Text:</dt>
									
									{pokemonData.flavorText? (
										<h5>{pokemonData.flavorText}</h5>
									) : (
										<dd>N/A</dd>
									)}
								
								</p>
								
							</div>
							
						</Typography>
					</CardContent>
				</Card>
			
			
				
			)
		
		}
		else{
		if((selectedTrainer.fullParty ===false)&&(selectedTrainer.party.indexOf(pokemonData)===-1)){
				return (
					<Card className={classes.card} variant='outlined'>
						<CardHeader className={classes.titleHead} title={pokemonData.name} />
						<CardMedia
							className={classes.media}
							component='img'
							image={pokemonData.image}
							title='Pokemon image'
						/>
		
						<CardContent>
							<Typography variant='body2' color='textSecondary' component='span'>
								<div>
								
									<p>
										<dt className='title'>Types:</dt>
										{pokemonData.types && pokemonData.types.length >= 1 ? (
											<span>
												{pokemonData.types.map((type) => {
													
													if (pokemonData.types.length > 1) return <li key={type.type.name}>{type.type.name},</li>;
													return <dd key={type.type.name}>{type.type.name}</dd>;
													
												})}
											</span>
										) : (
											<dd>N/A</dd>
										)}
									</p>
									<br/>
									
									<p>
										<dt className='title'>Moves:</dt>
										
										{pokemonData.moves && pokemonData.moves.length >= 1 ? (
											
											<span>
												{pokemonData.moves.map((move) => {
													
													if (pokemonData.moves.length > 1) return <p key={move}>{move},</p>;
													return <dd key={move}>{move}</dd>;
													
												})}
											</span>
											
										) : (
											<dd>N/A</dd>
										)}
		
									</p>
									<p>
									<dt className='title'>Flavor Text:</dt>
										
										{pokemonData.flavorText? (
											<h5>{pokemonData.flavorText}</h5>
										) : (
											<dd>N/A</dd>
										)}
									
									</p>
									<p><button onClick={() => togglePokemon('catch',pokemonData)}>
					   Catch
			</button></p>
								</div>
								
							</Typography>
						</CardContent>
					</Card>
			)
			}
			else if((selectedTrainer.fullParty ===false)&&(selectedTrainer.party.indexOf(pokemonData)!==-1)){
				return (
					<Card className={classes.card} variant='outlined'>
						<CardHeader className={classes.titleHead} title={pokemonData.name} />
						<CardMedia
							className={classes.media}
							component='img'
							image={pokemonData.image}
							title='Pokemon image'
						/>
		
						<CardContent>
							<Typography variant='body2' color='textSecondary' component='span'>
								<div>
								
									<p>
										<dt className='title'>Types:</dt>
										{pokemonData.types && pokemonData.types.length >= 1 ? (
											<span>
												{pokemonData.types.map((type) => {
													
													if (pokemonData.types.length > 1) return <li key={type.type.name}>{type.type.name},</li>;
													return <dd key={type.type.name}>{type.type.name}</dd>;
													
												})}
											</span>
										) : (
											<dd>N/A</dd>
										)}
									</p>
									<br/>
									
									<p>
										<dt className='title'>Moves:</dt>
										
										{pokemonData.moves && pokemonData.moves.length >= 1 ? (
											
											<span>
												{pokemonData.moves.map((move) => {
													
													if (pokemonData.moves.length > 1) return <p key={move}>{move},</p>;
													return <dd key={move}>{move}</dd>;
													
												})}
											</span>
											
										) : (
											<dd>N/A</dd>
										)}
		
									</p>
									<p>
									<dt className='title'>Flavor Text:</dt>
										
										{pokemonData.flavorText? (
											<h5>{pokemonData.flavorText}</h5>
										) : (
											<dd>N/A</dd>
										)}
									
									</p>
									<p>
										<button onClick={() => togglePokemon('release',pokemonData)}>
					   Release
			</button></p>
								</div>
								
							</Typography>
						</CardContent>
					</Card>
				
				
					
				)
			}
			else if(selectedTrainer.fullParty === true){
				return (
					<Card className={classes.card} variant='outlined'>
						<CardHeader className={classes.titleHead} title={pokemonData.name} />
						<CardMedia
							className={classes.media}
							component='img'
							image={pokemonData.image}
							title='Pokemon image'
						/>
		
						<CardContent>
							<Typography variant='body2' color='textSecondary' component='span'>
								<div>
								
									<p>
										<dt className='title'>Types:</dt>
										{pokemonData.types && pokemonData.types.length >= 1 ? (
											<span>
												{pokemonData.types.map((type) => {
													
													if (pokemonData.types.length > 1) return <li key={type.type.name}>{type.type.name},</li>;
													return <dd key={type.type.name}>{type.type.name}</dd>;
													
												})}
											</span>
										) : (
											<dd>N/A</dd>
										)}
									</p>
									<br/>
									
									<p>
										<dt className='title'>Moves:</dt>
										
										{pokemonData.moves && pokemonData.moves.length >= 1 ? (
											
											<span>
												{pokemonData.moves.map((move) => {
													
													if (pokemonData.moves.length > 1) return <p key={move}>{move},</p>;
													return <dd key={move}>{move}</dd>;
													
												})}
											</span>
											
										) : (
											<dd>N/A</dd>
										)}
		
									</p>
									<p>
									<dt className='title'>Flavor Text:</dt>
										
										{pokemonData.flavorText? (
											<h5>{pokemonData.flavorText}</h5>
										) : (
											<dd>N/A</dd>
										)}
									
									</p>
									<p>FULL</p>
								</div>
								
							</Typography>
						</CardContent>
					</Card>
				
				
					
				)
			
			
		
										}
	
}
}
};

export default Pokemon;
