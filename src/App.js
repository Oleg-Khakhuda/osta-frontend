import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import CreatePlatePage from './pages/CreatePlatePage/CreatePlatePage';
import PlatePage from './pages/PlatePage/PlatePage';
import { routes } from './routes';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path={routes.home} element={<Home />} />
      <Route path={routes.platePage} element={<PlatePage />} />
      <Route path={routes.createPlates} element={<CreatePlatePage />} />
    </Routes>
  );
}

export default App;
