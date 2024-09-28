import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Register from './components/Register.js';

function App() {
  return (
    <Router>
    
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/' element={<Navigate to="/login" />}/>
      </Routes>
      <ToastContainer autoClose={3000} position="bottom-left" />
    </div>

    </Router>
  );
}

export default App;
