// Navbar.js
import { AuthContext } from 'context/AuthContext';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// import { useAuthContext } from 'contexts/AuthContext';

export default function Navbar() {
const {authentication,dispatch} = useContext(AuthContext)
const {isAuth} = authentication;

  const handleLogOut = () => {
    dispatch({type: 'LOGOUT'})
    alert("logout")
  }


  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="#">
         <b><stron>Event</stron></b> 
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" />
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Link
              </Link>
            </li>
            {/* <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="#">
                    Action
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Another action
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Something else here
                  </Link>
                </li>
              </ul>
            </li>
          </ul> */}
          <div className="d-flex align-items-center">
            {isAuth ? (
              <>
                {/* <span className="text-light me-3">Hello, {user.fullName}</span> */}
                <Link to="/dashboard" className="btn btn-info">
                 Dashboard
                </Link>
                <button className="btn btn-success mx-3" onClick={handleLogOut}>LOGOUT</button>
              </>
            ) : (
              <Link to="/auth/login" className="btn btn-info">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
