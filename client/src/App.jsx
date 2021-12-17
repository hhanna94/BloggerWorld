import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Login from './views/Login';
import Registration from './views/Registration';

function App() {
  const categories = ["food", "fashion", "travel", "lifestyle", "fitness"]
  return (
    <BrowserRouter>
      <NavBar categories={categories} />
      <div id="main-container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
