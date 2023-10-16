import './App.css';
import { Routes, Route } from 'react-router-dom';
import Catalogue from './Component/Catalogue';
import Promotion from './Component/Promotion';
import Admin from './Component/Admin'


export default function App() {

   

    return (
        <>
            
            <Routes>                
              <Route path="/" element={<Catalogue />} />
              <Route path="/Promotion" element={<Promotion />} />
              <Route path="/Admin" element={<Admin />} />            
            </Routes>
           
        </>
  )
}


