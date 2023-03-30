

const axios = require('axios')
const flat = require('flat');
const unflatten = flat.unflatten;
const bluebird = require('bluebird');
const express = require('express');
const router = express.Router();
const app = express();
const redis = require("redis");
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


const baseUrl = 'https://pokeapi.co/api/v2/pokemon';



router.get('/page/:pagenum', async (req, res) => {
  
  let pagenum = req.params.pagenum;
  
 
  if(!pagenum){
      res.status(400).json({error:"No pagenumber was entered"})
  }
  let index = "page" + pagenum
  let cacheForPokemonExists = await client.existsAsync(index);
  
  if (cacheForPokemonExists===1) {
    idList = await client.hgetallAsync(index)
    unflatList = unflatten(idList)
 
    let results = [];
    for(let i =0;i< unflatList.ids.length;i++){

    
    let flatPokemon = await client.hgetallAsync(unflatList.ids[i]);
    let pokemon = unflatten(flatPokemon);
    results.push(pokemon)
    }
    
    
    res.status(200).json(results)
  } else {
   
      try{
         
          let offset = pagenum * 20;
        
          let url = baseUrl + "?offset=" + offset;
          
          const data = await axios.get(url);
          
          if(Object.keys(data.data.results).length === 0){
              res.status(404).json({error:"page not found"});
              return;
          }
          let unflatPokemon =[];
          let ids = {ids:[]};
          let results = {results:data.data.results}
          for(let i =0; i < data.data.results.length;i++){
            let pokemon = results.results[i];
            
            let pokemonSplit = pokemon.url.split("/");
           
            let pokemonId = pokemonSplit[6]
            let newUrl = baseUrl + "/" + pokemonId;
            ids.ids.push(pokemonId)
            const details = await axios.get(newUrl);
            
            if(Object.keys(details.data).length === 0){
                res.status(404).json({error:"pokemon not found"});
                return;
            }
            let moves = [];
            for(let i = 0; i < details.data.moves.length;i++){
                moves.push(details.data.moves[i].move.name);
            }
            let flavUrl =   "https://pokeapi.co/api/v2/pokemon-species/" + pokemonId;
            const flavorText = await axios.get(flavUrl);
            
            if(Object.keys(flavorText.data).length === 0){
                res.status(404).json({error:"pokemon not found"});
                return;
            }
            
            let newPokemon = {
                id: pokemonId,
                name: details.data.name,
                types:details.data.types,
                image: details.data.sprites.front_default,
                moves:moves,
                flavorText: flavorText.data.flavor_text_entries[0].flavor_text
            }
            
           
            let flatPokemon = await flat(newPokemon);
            unflatPokemon.push(newPokemon);
            
            await client.hmsetAsync(pokemonId,flatPokemon);
          }
          let pageNumber = "page" + pagenum
          let flatId = await flat(ids)
          await client.hmsetAsync(pageNumber,flatId);
          
          res.status(200).json(unflatPokemon);
      }catch(e){
          res.status(404).json(e);
      }
  
  }
});

router.get('/:id', async (req, res) => {
  
    let id = req.params.id;
   
    
    if(!id){
        res.status(400).json({error:"No id was entered"})
    }
    let cacheForPokemonExists = await client.existsAsync(id);
    
    if (cacheForPokemonExists===1) {
      let flatPokemon = await client.hgetallAsync(id);
      let pokemon = unflatten(flatPokemon);
      
      
      
      res.status(200).json(pokemon)
    } else {
        
        try{
            
            
          
            let url = baseUrl + "/" + id;
            
            const data = await axios.get(url);
            
            if(Object.keys(data.data.results).length === 0){
                res.status(404).json({error:"page not found"});
                return;
            }
            let results = {results:data.data.results}
            let flatPokemon = await flat(results);
            let pokemon = unflatten(flatPokemon)
            
            await client.hmsetAsync(id,flatPokemon);
            
            res.status(500).json(pokemon);
        }catch(e){
            res.status(404).json(e);
        }
    
    }
  });



module.exports = router;