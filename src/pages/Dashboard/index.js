import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Todos from './Todos'
import Addtodos from './Addtodos'
import Alltodo from './Alltodos'

export default function index() {
    return (
        <Routes>
            <Route path='/' >
                <Route index element={<Home />} />
                <Route path='todos' element={<Todos />} />
                <Route path='addtodos' element={<Addtodos/>} />
                <Route path='alltodos' element={<Alltodo/>} />
            </Route>
        </Routes>
    )
}
