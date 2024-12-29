import React from 'react'

export default function Footer() {
    const year = new Date().getFullYear()
  return (
   <footer className='bg-dark '>
     <div className="container">
        <div className="row">
            <div className="col">
                <div className="mb-0 text-center text-white"> &copy; {year}. All Rights Reserved</div>
            </div>
        </div>
    </div>
   </footer>
  )
}
