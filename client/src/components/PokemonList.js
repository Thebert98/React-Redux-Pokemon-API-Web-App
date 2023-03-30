import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import actions from '../actions';
import {useSelector} from 'react-redux';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, makeStyles } from '@material-ui/core';
import {useDispatch} from 'react-redux';
import '../App.css';

const baseUrl = 'http://localhost:4000/pokemon/page/';


const useStyles = makeStyles({
	card: {
		maxWidth: 250,
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
const PokemonList = (props) => {
	const dispatch = useDispatch();
	const [selectedTrainer,setSelectedTrainer] = useState(undefined);
	const allTrainers = useSelector((state) => state.trainers)
	const classes = useStyles();
	const [ loading, setLoading ] = useState(true);
	//const [ searchData, setSearchData ] = useState(undefined);
	const [ pokemonData, setPokemonData ] = useState(undefined);
	//const [ searchTerm, setSearchTerm ] = useState('');
	const [pagenum, setPageNum] = useState(0);
	//const [characterLimit, setCharacterLimit] = useState(undefined)
	let card = null;
    const togglePokemon = (selectFlag,pokemon) =>{
		if(selectFlag=== 'catch') dispatch(actions.addToTeam(pokemon))
		else if(selectFlag ==='release') dispatch(actions.removeFromTeam(pokemon))
	  }
	useEffect(() => {
		
		for(let i = 0;i<allTrainers.length;i++){
		if(allTrainers[i].selected===true) setSelectedTrainer(allTrainers[i]);
	}
		console.log('on load useeffect');
		async function fetchData() {
			try {
                
				console.log(props.match.params.pagenum)
                
				let url =baseUrl + props.match.params.pagenum
				 await fetch(url).then(response => response.json()).then(data => setPokemonData(data));
			
				console.log(pokemonData);
				
				
				setPageNum(parseInt(props.match.params.pagenum))
				
				setLoading(false);
			} catch (e) {
				console.log(e);
			}
		}
		fetchData();
	}, [props.match.params.pagenum]);

	/*useEffect(
		() => {
			console.log('search useEffect fired');
            
			async function fetchData() {
				try {
					console.log(`in fetch searchTerm: ${searchTerm}`);
					const { data } = await axios.get('https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=' + searchTerm + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash);
					setSearchData(data.data.results);
					setLoading(false);
				} catch (e) {
					console.log(e);
				}
			}
			if (searchTerm) {
				console.log ('searchTerm is set')
				fetchData();
			}
		},
		[ searchTerm ]
	);

	const searchValue = async (value) => {
		setSearchTerm(value);
	};
	
	*/
	const goToNextPage = async()=>{
		
		window.location.href ='/pokemon/page/' + (pagenum+1);
	};
	const goToPreviousPage = async ()=>{
		window.location.href ='/pokemon/page/' + (pagenum-1);
		
	}
	const buildCard = (pokemon) => {
		
			return (
				
				<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={pokemon.id}>
					<Card className={classes.card} variant='outlined'>
						<CardActionArea>
							<Link to={`/pokemon/${pokemon.id}`}>
								<CardMedia
									className={classes.media}
									component='img'
									image={pokemon.image}
									title='Pokemon image'
								/>

								<CardContent>
									<Typography className={classes.titleHead} gutterBottom variant='h6' component='h3'>
										{pokemon.name}
									</Typography>
									<Typography variant='body2' color='textSecondary' component='p'>
										{ pokemon.id}
										<span>More Info</span>
									</Typography>
								</CardContent>
							</Link>
							
						</CardActionArea>
					</Card>
				</Grid>
			);
		}
	
	/*if (searchTerm) {
		card =
           
			searchData &&
			searchData.map((character) => {
                
				
				return buildCard(character);
			});
	} 
	*/

        if(pokemonData == "No Results"){
            return (
                <div>
                    <h2>404 page not found</h2>
                </div>
            )
        }
	if(selectedTrainer===undefined){
		card =
			pokemonData &&
			pokemonData.map((pokemon) => {
				return( 
					
					buildCard(pokemon)
					
				)
			});
		}
	
	else{
		
			card =
				pokemonData &&
				pokemonData.map((pokemon) => {
					if((selectedTrainer.fullParty ===false)&&(selectedTrainer.party.indexOf(pokemon)===-1)){
					return( 
						<div>
						{buildCard(pokemon)}
						<button onClick={() => togglePokemon('catch',pokemon)}>
                   Catch
                    </button>
					
						</div>
					)
					}
					else if((selectedTrainer.fullParty ===false)&&(selectedTrainer.party.indexOf(pokemon)!==-1)){
						return( 
							<div>
							{buildCard(pokemon)}
							<button onClick={() => togglePokemon('release',pokemon)}>
                  			 Release
                    </button>
							</div>
						)
					}
					else if(selectedTrainer.fullParty === true){
						return( 
							<div>
							{buildCard(pokemon)}
							
							
							
							   <h5>Full</h5> 
						
							</div>
						)
					}
				});
			
			
	}

	if (loading) {
		return (
			<div>
				<h2>Loading...</h2>
			</div>
		);
	
	} else {

		
		
		if(pagenum === 0){
			return(
				<div>
				
				
				
				<button
							onClick={goToNextPage}
							className={`next ${pagenum === 86 ? 'disabled' : ''}`}
						>
							next
						</button>
				<br />
				<br />
				<Grid container className={classes.grid} spacing={5}>
					{card}
				</Grid>

			</div>
		);
	}
	else if(pagenum === 86){
		return (
		<div>
				
				
				<button
						onClick={goToPreviousPage}
						className={`prev ${pagenum === 0 ? 'disabled' : 'yes'}`}
					>
						previous
					</button>
				
				<br />
				<br />
				<Grid container className={classes.grid} spacing={5}>
					{card}
				</Grid>

			</div>
		);
	}

	
	else{	
		
		return (
			<div>
				
				
				<button
						onClick={goToPreviousPage}
						className={`prev ${pagenum === 0 ? 'disabled' : 'yes'}`}
					>
						previous
					</button>
				<button
							onClick={goToNextPage}
							className={`next ${pagenum === 86 ? 'disabled' : ''}`}
						>
							next
						</button>
				<br />
				<br />
				<Grid container className={classes.grid} spacing={5}>
					{card}
				</Grid>

			</div>
		);
	}
	}
};

export default PokemonList;
