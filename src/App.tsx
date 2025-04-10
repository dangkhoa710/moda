import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import ModaMenu from './pages/ModaMenu';
import Mac from './pages/Mac';
import Owr from './pages/Owr';
import Di from './pages/Di';
import An from './pages/An';
import { getUserData } from './utils/localStorage';

function App() {
  const user = getUserData();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={user ? '/moda/menu' : '/moda/home'} />} />
        <Route path="/moda/home" element={<Home />} />
        <Route path="/moda/quiz" element={<Quiz />} />
        <Route path="/moda/menu" element={<ModaMenu />} />
        <Route path="/moda/mac" element={<Mac />} />
        <Route path="/moda/owr" element={<Owr />} />
        <Route path="/moda/di" element={<Di />} />
        <Route path="/moda/an" element={<An />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;