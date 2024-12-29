import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
   <div className="py-5">
    <div className="container">
      <div className="row">
        <div className="col text-center">
          <h2>Home-Dashboard</h2>
          <Link to="/" className="btn btn-primary">Home</Link>
          <Link to="addtodos" className="btn btn-info mx-5">Add Event</Link>
          <Link to="alltodos" className="btn btn-warning mx-5">show myEvent</Link>
        </div>
      </div>
    </div>
   </div>

 
    </>
  )
}
