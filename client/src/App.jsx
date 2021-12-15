import './App.css';
import NavBar from './components/NavBar';

function App() {
  const categories = ["food", "fashion", "travel", "lifestyle", "fitness"]
  return (
    <div>
      <NavBar categories={categories} />
      <div id="main-container">

      </div>
    </div>
  );
}

export default App;
