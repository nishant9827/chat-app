import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

import Header from './components/header/Header';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Chat from './pages/Chat';
import SetAvatar from './pages/SetAvatar';
import Check from './pages/Check';
function App() {
  return (
    <>
    
    <BrowserRouter>
      {/* <Header/> */}
      <Routes>
        <Route path='/' element={<Chat/>}/>
        <Route path='product-list' element={<h1>Home Page</h1>}/>
        <Route path='add-product' element={<h1>Home Page</h1>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/setAvatar' element={<SetAvatar/>}/>
        {/* <Route path='/check' element={<Check/>}/> */}
      </Routes>
    </BrowserRouter>

    </>
  );
}

export default App;
