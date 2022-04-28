import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';
import { HashRouter, Routes, Route } from 'react-router-dom'
import PokemonDetail from './PokemonInfo/PokemonDetail';
import NameForm from './Components/NameForm/NameForm';
import Pokedex from './Components/Pokedex/Pokedex';
import './App.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<NameForm/>} />
          <Route element={<ProtectedRoutes/>} >
            <Route path="/pokedex" element={<Pokedex/>} /> 
            <Route path="/pokedex/:id" element={<PokemonDetail/>} />
          </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
