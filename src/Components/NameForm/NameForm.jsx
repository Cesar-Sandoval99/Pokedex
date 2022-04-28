import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { useState } from 'react';
import './NameFormStyles.css'
import React from 'react';

const NameForm = () => {
    
    const [name, setName] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submit = e => {
        e.preventDefault()
        dispatch({type: "SET_NAME", payload: name})
        navigate("/pokedex")
    }
    
    return (
        <div className='background'>
            <h1>Hello trainer!</h1>
            <div className='form' >
                <div>
                    <img src="https://www.pngmart.com/files/12/Pokemon-Ash-Ketchum-PNG-Transparent-Image.png" alt="" />
                </div>
            </div>
            <form className='formStyles' onSubmit={submit} action="">
                <label htmlFor="">
                    <div>Enter your name to start</div>
                    <input 
                        className='name'
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </label>
                <button className='submit' ><img src="https://img.icons8.com/ios-filled/20/000000/paper-plane.png"/></button>
            </form>
        </div>
    );
};

export default NameForm;