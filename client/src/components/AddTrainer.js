import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import actions from '../actions';

function AddTrainer() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({trainerName: ''});

  const handleChange = (e) => {
     setFormData((prev) => ({...prev, [e.target.name]: e.target.value}));
  };
  const addTrainer = () => {
    dispatch(actions.addTrainer(formData.trainerName));
    document.getElementById('trainerName').value = '';
  
  };
  console.log(formData);
  return (
    <div className='add'>
      <div className='input-selection'>
        <label>
          Name:
          <input
            type='name'
            onChange={(e) => handleChange(e)}
            id='trainerName'
            name='trainerName'
            placeholder='Trainer name...'
          />
        </label>
      </div>
      <button onClick={addTrainer}>Add Trainer</button>
    </div>
  );
}

export default AddTrainer;