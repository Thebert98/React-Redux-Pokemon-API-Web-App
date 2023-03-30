
import React from 'react';
//import AddTrainer from './AddTrainer';
import {useDispatch} from 'react-redux';
import actions from '../actions';
import {useState} from 'react';
import {useSelector} from 'react-redux';

import { props } from 'bluebird';
function Trainer(props){
    const dispatch = useDispatch();

  const deleteTrainer = () => {
    dispatch(actions.deleteTrainer(props.trainer.id));
  };
  const selectTrainer = (selectFlag) =>{
    if(selectFlag=== 'selected') dispatch(actions.selectTrainer(props.trainer.id))
  }

 

    return(
        <div className='trainer-wrapper'>
            <table>
                <tbod>
                    <tr>
                        <td>
                            Trainer:
                        </td>
                        <td>{props.trainer.trainerName}</td>
                    </tr>
                    <tr>
                        <td>Team:</td>

                       
                        {props.trainer.party && props.trainer.party.length >= 1 ? (
									
									<span>
										{props.trainer.party.map((pokemon) => {
                                            
											if (props.trainer.party.length > 1) {
                                                return (
                                                <div key={pokemon.id}>
                                                    <img src={pokemon.image}/>
                                                     <h4>{pokemon.name}</h4>
                                                </div>
                                                )};
											return (<div key={pokemon.id}>
                                            <img src={pokemon.image}/>
                                             <h4>{pokemon.name}</h4>
                                        </div>)
                                            
										})}
									</span>
									
								) : (
									<br/>
								)}

                    </tr>
                    <td>
                <button onClick={deleteTrainer}>Delete Trainer</button>
                </td>
                <td>
                {!props.trainer.selected && (
                    <button onClick={() => selectTrainer('selected')}>
                    Select
                    </button>
                )}
                {props.trainer.selected && (
                   <h5>Selected</h5> 
                )}
                </td>
                </tbod>
            </table>
           
            
        </div>
    );
}

export default Trainer;