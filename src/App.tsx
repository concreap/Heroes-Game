import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import GameState from './context/game/gameState';

const Home = React.lazy(() => import("./components/pages/Home"))

const App = () => {

  return (

    <Router>

        <GameState>
        
          <Routes>

            <Route path='/' element={ <Home /> } />

          </Routes>

        </GameState>

    </Router>

  )

}

export default App;