import Trainer from './Trainer'
import AddTrainer from './AddTrainer';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import React from 'react';
function Trainers(){
    const [addBtnToggle, setBtnToggle] = useState(false)
    const allTrainers = useSelector((state) => state.trainers)
    console.log(allTrainers)

    return(
        <div className='trainer-wrapper'>
            <h2>Trainers</h2>
            <button onClick ={()=>setBtnToggle(!addBtnToggle)}>Add Trainer</button>
            <br/>
            <br/>
            {addBtnToggle &&<AddTrainer />}
            <br/>
            {allTrainers.map((trainer)=>{
                console.log(trainer)
                return<Trainer key={trainer.id} trainer={trainer} />
            })}
            
        </div>
    );
}

export default Trainers;