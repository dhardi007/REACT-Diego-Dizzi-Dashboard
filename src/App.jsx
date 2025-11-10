// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Testimonios from './pages/Testimonios';
import Contador from './pages/Contador';
import Calculadora from './pages/Calculadora';
import Tareas from './pages/Tareas';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/testimonios" element={<Testimonios />} />
        <Route path="/contador" element={<Contador />} />
        <Route path="/calculadora" element={<Calculadora />} />
        <Route path="/tareas" element={<Tareas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
