import './App.css';
import { Routes, Route } from 'react-router-dom';
import Catalogue from './Component/Catalogue';
import Promotion from './Component/Promotion';
import Admin from './Component/Admin'
import { useState } from 'react';
import { claim } from './Auth/auth.models';
import AuthenticationContext from './Auth/AuthenticationContext';
import NavMenu from './Component/NavMenu';
import Login from './Auth/Login';


export default function App() {

    const [claims, setClaims] = useState<claim[]>([
        { name: 'email', value: 'noreddinlam@gmail.com' },
        /*{ name: 'role', value: 'admin' }*/
    ]);

    return (
        <>
            <AuthenticationContext.Provider value={{ claims, update: setClaims }}>
            <NavMenu />
            <Routes>                
              <Route path="/" element={<Catalogue />} />
              <Route path="/Promotion" element={<Promotion />} />
              <Route path="/Admin" element={<Admin />} />
              <Route path="/Login" element={<Login />} />
            </Routes>
            </AuthenticationContext.Provider>
        </>
  )
}


