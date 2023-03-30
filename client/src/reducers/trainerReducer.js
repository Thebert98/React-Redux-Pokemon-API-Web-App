import {v4 as uuid} from 'uuid';

const intialState= [{
    id: uuid(),
    trainerName: "Red",
    party: [],
    fullParty: false,
    selected: false
    
}]

let copyState = null;
let index = 0;

const trainerReducer = (state = intialState,action) =>{
    const{type,payload} = action;

    switch(type){
        case 'CREATE_TRAINER':
            console.log('payload',payload)
            return[...state,{id:uuid(), trainerName: payload.trainerName, party:[],fullParty: false, selected: false }];
        case 'DELETE_TRAINER':
            copyState = [...state];
            index = copyState.findIndex((x)=>x.id === payload.id);
            copyState.splice(index,1);
            return [...copyState];
        case 'ADD_TO_TEAM':
            copyState = [...state];
            index = copyState.findIndex((x)=>x.selected === true);
            copyState[index].party.push(payload.pokemon)
            if(copyState[index].party.length === 6)copyState[index].fullParty = true
            return [...copyState];
        case 'REMOVE_FROM_TEAM':
            copyState = [...state];
            index = copyState.findIndex((x)=>x.selected === true);
            let newParty = [];
            for(let i = 0; i< copyState[index].party.length;i++){
                if(payload.pokemon.id !== copyState[index].party[i].id){
                    newParty.push(copyState[index].party[i]);
                }
    
            }
            if(copyState[index].fullParty === true)copyState[index].fullParty = false
            copyState[index].party = newParty;
            return [...copyState];
         case 'SELECT_TRAINER':
                copyState = [...state];
                index = copyState.findIndex((x)=>x.selected === true);
                console.log(index)
                if(index !== -1) copyState[index].selected = false;
                index = copyState.findIndex((x)=>x.id === payload.id)
                copyState[index].selected = true;
                return [...copyState];
                default:
                     return state;
    }
}


export default trainerReducer;