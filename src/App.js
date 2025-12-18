import './App.css';
import './styles/birthday.css';
import './styles/enchanted.css';
import './styles/interactive.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BirthdaySurprise from './pages/BirthdaySurprise';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BirthdaySurprise />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;