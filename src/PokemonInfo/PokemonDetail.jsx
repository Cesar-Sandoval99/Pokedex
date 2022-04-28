import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import './PokemonDetail.css'
import React from 'react';
import axios from 'axios';

const PokemonDetail = () => {

    const {id} = useParams()
    const [pokemonDetail, setPokemonDetail] = useState({})

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => setPokemonDetail(res.data))
    }, [])

    return (
        <div className='color'>
            <header className='navDetail'>
                <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png" alt="" />
                <div>
                    <Link to={"/pokedex"}>
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAABHCAYAAABVsFofAAAABmJLR0QA/wD/AP+gvaeTAAAEBElEQVR4nO2cy48NQRSHv5kMIUNMPOKxIDEmSCTCDjEMMxEkFhYekYj3/ANYSUSwIGxs2HhsWEo8dxZGMDYeCTKTeEu87xUJMQzNokwwU9W3u09V3bo3/SVn07f7nFO/W7f7nOruCzk5OTk5QVAjPL4JWAbMBaYCo4B6aVICvgAFoBu4DlwGHvlOogW4BvyqAOsAFrqR4X+agEueB2fLLgKN9iVRtAHFAAYpsSLQaluYzUBvAIOzYb3AJlvCtFWRMH32A1gqFaaJyv8pmawITJGIczmAQbi0C1mFWRBA8j5scRZxKqWOkVpHWmGaAkjal0UY6p9agzjLS4hXTdSgWqABmMSZ4y6XIJmr22gSZ6rDREJEO16TOKMtBY2APcA4YBqqvwmRMWl2LiA/0f0ENvTzOwR4asG3bfugE8E0c6REqH7sVL/tPUCno5gSUq1rSWaObsb0UQd0CXy7soIPceKEATgUgBBlEScC2mN87gtAhLKIU8nCGMWpK61TSSJgC3DS8Hk7sBZ4YiFWPTDWgh8RaWbOFs+5DQImARuBs6grYJA/qxCKuomoWfsDy+JI65x7wuNt8AI1i9pIOQOyknTmdOKukMzCZOAxlmaOqTIsACMTJnQY2B7z+QjsCfgxwT4zgBvA8BR+i6i7tYlIeyk/GONrPao4tHHJ/QbcB/YS3xyvSenXeRHoS6A++wisMsSrAW6m8OWlffAtUARsNcRrTeHHizilBNom8Guy78BsTaxa4G1CH97EKSXQLaFvnV0xxDqe8HgndY6JHcABw2fPHMRrQRWD/bktceqyRtnJQIFGA4scxKpBv0j+WuLURuMZx07U/ehjQAOwG3vr0/3RNaTvJQ5diwOw8o+5RrcOLPoiQir9pdzRbJsgcVgt4twHHmq2z3QRzMatGZ+2QjOGWuBNwuO91jk+7YhhDItS+Kg6cX4C+9GfGoLsrXzYJ+AMMCsm/3UpfTpbYE/CY2AXcBfVC2XlK6pfimL2mQkcFcQoic2ZEwHTXSb7D5OB5xlyLNvP6lXGgaZliSDvsonTAwzNNNxkTAROILv7oH3KwsRLQSCdHQMGpx+3kQZgNXAaO/etXuiCmBbY72K/uiwCD1DrwFmoRTWX40m++J+UO2gWzExXqy7sizMSmG/Zpy26dRtNvdVNh4mEyPU0O09BXYJtnndCNeNzyHF0BJC4D7uaVhiA5gAS92EtWcQB9RRFuZN3aeeyCgPq3BNyEyqxAqrdENFK9b2p10vGV4l0bKoigXpRz/NYpRl4F8DgJFbAwdvBfTRSuSfp81g4xyRhIaoOCr1QjFB1THOWQUr/y6IR9SLXPP7+l8UwoU8Jn1HLD92op7suYecR35ycnJyccvIbL8kTNLN0OegAAAAASUVORK5CYII="/> 
                    </Link>
                </div>
            </header>
            <section className='sectionCard' >
                <div className='pokemonsCard' >
                    <span className='pokeImg'>
                        <img src={pokemonDetail.sprites?.other.dream_world.front_default} alt="pokemon-img" />
                    </span>
                    <div className='infoCard' >
                        <p><b>Weight:</b> {pokemonDetail?.weight}</p>
                        <div>
                            <h2>{pokemonDetail?.name}</h2>
                            <p className='center' ><b>#{pokemonDetail?.id} </b></p>
                        </div>
                        <p><b>Height:</b> {pokemonDetail?.height}</p>
                    </div>
                    <div className='abilitiesCard' >
                        <div className='type-abilities'>
                                <b>type:</b>
                                <p>{pokemonDetail.types?.[0]?.type.name}</p> <p>{pokemonDetail.types?.[1]?.type.name}</p>    
                        </div>
                        <div className='type-abilities'>
                            <b>Abilities:</b> <p>{pokemonDetail.abilities?.[0]?.ability.name}</p> <p>{pokemonDetail.abilities?.[1]?.ability.name}</p>
                        </div>
                    </div>
                    <div className='statsCard'>
                        <div className='statsBar'>
                            <label htmlFor="HP">Healt:</label>
                            <progress min="0" max="200" value={pokemonDetail.stats?.[0].base_stat} id="HP"></progress>{pokemonDetail.stats?.[0].base_stat}/200
                        </div>

                        <div className='statsBar'>
                            <label htmlFor="speed">Speed:</label>
                            <progress min="0" max="200" value={pokemonDetail.stats?.[5].base_stat} id="speed"></progress>{pokemonDetail.stats?.[5].base_stat}/200
                        </div>

                        <div className='statsBar'>
                            <label htmlFor="attack">Attack:</label>
                            <progress min="0" max="200" value={pokemonDetail.stats?.[1].base_stat} id="attack"></progress>{pokemonDetail.stats?.[1].base_stat}/200
                        </div>

                        <div className='statsBar'>
                            <label htmlFor="defense">Defense:</label>
                            <progress min="0" max="200" value={pokemonDetail.stats?.[2].base_stat} id="defense"></progress>{pokemonDetail.stats?.[2].base_stat}/200
                        </div>
                        
                    </div>
                </div>
                <div className='movementsCard' >
                    <ul>
                        <b><p>Movements</p></b>
                        {
                            pokemonDetail.moves?.map(move => 
                                <li key={move?.move?.url}>
                                    {move.move?.name}
                                </li>)
                        }
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default PokemonDetail;