import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home/Home';
import NewEntry from './pages/NewEntry/NewEntry';
import Watched from './pages/Watched/Watched';
import Edit from './pages/Edit/Edit';
import Layout from './components/Layout/Layout';
import { Content } from './types/Content';
import { storage } from './utils/storage';
import { mockContent } from './utils/mockData';

function App() {
  const [porVer, setPorVer] = useState<Content[]>([]);
  const [watched, setWatched] = useState<Content[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    storage.clear();
    setPorVer(mockContent);
    storage.set('porVer', mockContent);
    setWatched([]);
    storage.set('watched', []);
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      storage.set('porVer', porVer);
    }
  }, [porVer, hasLoaded]);

  useEffect(() => {
    if (hasLoaded) {
      storage.set('watched', watched);
    }
  }, [watched, hasLoaded]);

  return (
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
