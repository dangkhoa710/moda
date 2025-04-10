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
        <Route path="/" element={<Navigate to={user ? '/' : '/home'} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/" element={<ModaMenu />} />
        <Route path="/mac" element={<Mac />} />
        <Route path="/owr" element={<Owr />} />
        <Route path="/di" element={<Di />} />
        <Route path="/an" element={<An />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;