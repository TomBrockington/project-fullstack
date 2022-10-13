import './app.css';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home';
import Profile from './pages/profile/profile';
import Login from './users/login/Login';
import Register from './users/register/Register';
import Test from './pages/testPage/Test';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        

        <Route path='/home' element={<Home />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/test' element={<Test />}/>

      </Routes>
    </>
  );
}

export default App;
