import PokemonInfo from '../../PokemonInfo/PokemonInfo';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './PokedexStyles.css'
import axios from 'axios';


const Pokedex = () => {

    const navigate = useNavigate()
    const name = useSelector(state => state.name)
    const [pokemons, setPokemons] = useState([])
    const [types, setTypes] = useState([])
    const [searchPokemons, setSearchPokemons] = useState([])
    const [pages, setPages] = useState(1)
    const [button, setButton] = useState(false)

    const menuButton = e =>{
        e.preventDefault()
        setButton(true)
    }
    const invisibleButton = e =>{
        e.preventDefault()
        setButton(false)
    }


    useEffect(() =>{
        axios.get("https://pokeapi.co/api/v2/pokemon?limit=1000&offset=200")
            .then(res => setPokemons(res.data.results))
    }, [])

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/type/')
            .then(res => setTypes(res.data.results))
    },[])

    
    const filterPokemons = url => {
        axios.get(url)
            .then(res => setPokemons(res?.data.pokemon))
            setPages(1)
    }

    const search = () => navigate(`/pokedex/${searchPokemons}`)

    
    const pokemonPage = 16
    
    const lastIndex = pages * pokemonPage 
    const firstIndex = lastIndex - pokemonPage 
    
    const paginatedPokemons = pokemons.slice(firstIndex, lastIndex)

    const totalpages = Math.ceil(pokemons.length / pokemonPage)

    let pagesNumber = []

        for (let i = 1; i <= totalpages; i++) {
            if(pagesNumber.length < 14){
                pagesNumber.push(i)
            }
        }


    return (
        <section className='color position' >
            <header className='nav'>
            <h2>Welcome {name}!</h2>
            <div className='invisible flex' id='Menu'>
                <ul>
                    <a href="https://pokeapi.co/" target="_blank">Info API</a>
                    <Link to={"/"} ><li><p>Log out</p></li></Link>
 
                </ul>
            </div>

            <button onClick={menuButton} className={button ?  "invisible": "burger-leave hamburguer"}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAAUklEQVRYhe3UMQrAIBBE0U9OF8n9L6DeI1aWNkZ2IfwHU++wxYCktQfowPsxDSg7BdqB4zN1deTaaRalcOYLFbiDu+sn3IF07oDSuQPp3AEpxAByVqjTvbRpTgAAAABJRU5ErkJggg=="/></button>
            </header>
                <div className={ button ? "flex visibleMenu" : "invisible"}>
                    <div>
                        <a href="https://pokeapi.co/" target="_blank">Info API</a>
                        <Link to={"/"} ><li><p>Log out</p></li></Link>
                    </div>
                    <button className='buttonInvisible' onClick={invisibleButton} ><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABh0lEQVRIie3WT0tUURjH8c+YSgUSpmGWhKgQYVIgZO5GEKGNkNBeCF25FVzqslfRPl+AIBShUIt8BSXiwk3QSvBfSbU4Z+R6cZy5M96ZjT94uPec85zzPc9zz5/LtSqrvRnQafzAUCOhr7COYWw2Cj6NNdzGfIR+zRtegnZjJlGfK7wE7ccobqXac4GXoEMRfK+M35XCk5H2o7eC/5XAkwtpVPlI64IXLoCuYguHqbY5vMCHWJ7CYsrnITowge0qJ3yp3mPA+ZTPRqtJLRl82/C4VlA94AIeNAN8gk/NALfjSTPABZX3cy7gE3xsNPgId/A0UfdLuDhyBe/hvnB8lvQZrzGWYZwzpU+uchrHG7yL5Z/x2Ycllff3AN4Kk82kFmxgBIOyR7iMYrLiRpUd/wnpXsB3IVOn+F1l/yJ2o2UCw44QbRHf0IWX2McfYavdvOC9R7jlagbDF3RiRbh9tuLAB3gunOdHeIZWHAuf51EaXO3iSuuu8NM3GSf/N1o51by4rlW3/gMSl0RMMojXiAAAAABJRU5ErkJggg=="/></button>
                </div>
            <div >
                <div className='search'>
                    <div>
                        Type:
                        <select onChange={e => filterPokemons(e.target.value)} >
                            {
                                types.map(type => (
                                    <option key={type.url} value={type.url} >
                                        {type.name}
                                    </option>
                                    ))
                            }
                        </select>
                    </div>
                    <div>
                        <input type="text" 
                            value={searchPokemons} 
                            onChange={e => setSearchPokemons(e.target.value)}
                            placeholder='Pokemon name or id' 
                        />
                        <button className='searchButton' onClick={search}>Submit</button>
                    </div>
                    
                </div>
                <ul className='listStyles'>
                    {
                    paginatedPokemons?.map(pokemon => 
                        <li key={pokemon?.url ? pokemon.url : pokemon.pokemon.url} className='columns'>
                            <PokemonInfo url={pokemon?.url ? pokemon.url : pokemon.pokemon.url} />
                        </li>
                    
                    )
                    }
                </ul>
                    <div className='pages' >                    
                        {
                            pages !== 1 && (
                                <button className='buttonPages' onClick={() => setPages(pages - 1)} >Before</button>
                                )
                            }
                            {
                                pagesNumber.map(number => <button className='buttonPages' key={number} onClick={() => setPages(number)} >{number}</button>)
                            }
                            {
                                pages !== totalpages && (
                                    <button className='buttonPages' onClick={() => setPages(pages + 1)} >Next</button>
                                    )
                                }
                    </div>
            </div>
                <a href="https://github.com/Cesar-Sandoval99"  target="_blank">               
                    <button className='buttonHome'><b><p>Click.me!</p></b><img src="https://img.icons8.com/ios-filled/50/000000/github.png"/></button>
                    
                </a>   
        </section>
    );
};

export default Pokedex;