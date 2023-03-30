const addTrainer = (trainerName) =>({
    type: 'CREATE_TRAINER',
    payload:{
        trainerName: trainerName,
    }

});

const deleteTrainer = (id)=>({
    type: 'DELETE_TRAINER',
    payload: {id:id}
});

const selectTrainer = (id)=>({
    type: 'SELECT_TRAINER',
    payload:{id:id}
})

const addToTeam = (pokemon)=>({
    type: 'ADD_TO_TEAM',
    payload: {
    pokemon:pokemon}
});
const removeFromTeam = (pokemon)=>({
    type: 'REMOVE_FROM_TEAM',
    payload:{
        
        pokemon:pokemon
    }
})


module.exports = {
    addTrainer,
    deleteTrainer,
    addToTeam,
    removeFromTeam,
    selectTrainer
}