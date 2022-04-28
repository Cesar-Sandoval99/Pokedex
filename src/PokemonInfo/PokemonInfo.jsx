import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import './PokemonInfoStyles.css'
import axios from 'axios';
import React from 'react';


const PokemonInfo = ({url}) => {

    const [pokemonInformation, setPokemonInformation] = useState({})

    useEffect(() => {
        axios.get(url)
            .then(res => setPokemonInformation(res.data))
    }, [url])
    


    return (
        
        <Link to={`/pokedex/${pokemonInformation?.id}`} >
            <div className='position'>
                <div className='pokemonCard'>
                    <div className=''> 
                        <h2>{pokemonInformation?.name}</h2>
                        <p className='txtCard'><b>Types:</b> {pokemonInformation.types?.[0]?.type.name}, {pokemonInformation.types?.[1]?.type.name} {pokemonInformation.types?.[2]?.type.name} </p>
                        <p className='txtCard'><b>Hp:</b> {pokemonInformation.stats?.[0].base_stat}</p>
                        <p className='txtCard'><b>Attack:</b> {pokemonInformation.stats?.[1].base_stat}</p>
                        <p className='txtCard'><b>Defense:</b> {pokemonInformation.stats?.[2].base_stat}</p>
                        <p className='txtCard'><b>Speed:</b> {pokemonInformation.stats?.[5].base_stat}</p>
                    </div>
                    <div>
                        <img className='initialImg' src={pokemonInformation.sprites?.front_default} alt="pokemon-img" />   
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PokemonInfo;