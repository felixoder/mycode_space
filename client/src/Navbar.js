import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';

export default function Navbar() {
  
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch('https://code-009.onrender.com/profile', {
      credentials: 'include'
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('https://code-009.onrender.com/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            FelixCodez
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {username && (
                  <>
                    <Link to="/create" className='create-post'>Create new Post</Link>
                    <a onClick={logout} className='log-out' >Logout</a>
                  </>
                )}
              </li>
              {!username && (
                <>
                  <li className="nav-item active">
                    <Link className="nav-link active " aria-current="page" to="/register">
                      Register
                    </Link>
                  </li>
                
                  <li className="nav-item">
                    <Link className="nav-link active" to="/login">
                      Login
                    </Link>
                  </li>
                
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
