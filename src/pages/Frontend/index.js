import React from 'react'
import { Routes , Route } from "react-router-dom";

import Home from './Home';

import Header from './components/Header';

import Footer from './components/Footer';
import About from './About/About';

export default function index() {
  return (
    <>
    <Header/>
    <main>

    <Routes>
    <Route path='/'>
    <Route index element={<Home/>} />
    <Route path='about' element={<About/>} />

    </Route>
    </Routes>
    </main>
    <Footer/>
    
    </>
  )
}
