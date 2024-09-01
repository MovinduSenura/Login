import React from "react";
import Login from "./components/Login";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from "./components/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
