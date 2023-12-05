import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Boilerplate from '../pages/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Boilerplate />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
