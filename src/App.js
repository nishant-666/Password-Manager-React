import './App.css';
import { Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import { app, database } from './firebaseConfig';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register database={database}/>} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home database={database}/>} />
      </Routes>
    </div>
  );
}

export default App;
