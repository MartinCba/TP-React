import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home/Home';
import NewEntry from './pages/NewEntry/NewEntry';
import Watched from './pages/Watched/Watched';
import Edit from './pages/Edit/Edit';
import Layout from './components/Layout/Layout';
import { Content } from './types/Content';
import { storage } from './utils/storage';

function App() {
  // Estado para la lista de contenidos por ver
  const [porVer, setPorVer] = useState<Content[]>([]);
  // Estado para la lista de contenidos ya vistos
  const [watched, setWatched] = useState<Content[]>([]);
  // Estado para saber si ya se cargaron los datos desde el storage
  const [hasLoaded, setHasLoaded] = useState(false);

  // useEffect que se ejecuta una sola vez al montar el componente
  useEffect(() => {
    // Obtiene del localStorage los contenidos guardados como por ver
    const pv = storage.get<Content[]>('porVer');
    // Obtiene del localStorage los contenidos guardados como vistos
    const wv = storage.get<Content[]>('watched');
    // Si existen, se actualiza el estado correspondiente
    if (pv) setPorVer(pv);
    if (wv) setWatched(wv);
    // Marca que ya se hizo la carga inicial
    setHasLoaded(true);
  }, []);

  // useEffect que guarda en localStorage el estado de "por ver" cada vez que cambia,
  // pero solo si ya se hizo la carga inicial
  useEffect(() => {
    if (hasLoaded) {
      storage.set('porVer', porVer);
    }
  }, [porVer, hasLoaded]);

  // useEffect que guarda en localStorage el estado de "watched" cada vez que cambia,
  // pero solo si ya se hizo la carga inicial
  useEffect(() => {
    if (hasLoaded) {
      storage.set('watched', watched);
    }
  }, [watched, hasLoaded]);

  return (
    // Envolvemos la aplicación en un Router para manejar las rutas
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Home porVer={porVer} setPorVer={setPorVer} setWatched={setWatched} />
            }
          />
          <Route path="new" element={<NewEntry onAdd={(item) => setPorVer((prev) => [...prev, item])} />} />
          <Route path="watched" element={<Watched watched={watched} setWatched={setWatched} />} />
          <Route
            path="edit"
            element={
              <Edit
                porVer={porVer}
                setPorVer={setPorVer}
                watched={watched}
                setWatched={setWatched}
              />
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
