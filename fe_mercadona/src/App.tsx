import './App.css';
import { Routes, Route } from 'react-router-dom';
import Catalogue from './Component/Catalogue';
import Promotion from './Component/Promotion';
import Admin from './Component/Admin'
import { useEffect, useState } from 'react';
import { claim } from './Auth/auth.models';
import AuthenticationContext from './Auth/AuthenticationContext';
import NavMenu from './Component/NavMenu';
import Login from './Auth/Login';
import { getClaim } from './Auth/handleJWT';


export default function App() {

    const [claims, setClaims] = useState<claim[]>([]);
    useEffect(() => {
        setClaims(getClaim());
    },[])

    return (
        <>
            <AuthenticationContext.Provider value={{ claims, update: setClaims }}>
            <NavMenu />
            <Routes>                
              <Route path="/" element={<Catalogue props={undefined} />} />
              <Route path="/Promotion" element={<Promotion props={undefined} />} />
              <Route path="/Admin" element={<Admin props={undefined} />} />
              <Route path="/Login" element={<Login />} />
            </Routes>
            </AuthenticationContext.Provider>
        </>
  )
}


