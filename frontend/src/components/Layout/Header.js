import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const auth = localStorage.getItem("token");
  if (auth) {
    console.log(auth);
  }
  const nav = useNavigate();
  const handleLogout = () => {
    alert("Do you want to logout?");
    localStorage.clear();
    nav("/");
  };

  const handleDashboard = () => {
    alert("Please Login");
    nav("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Navbar
          </a>
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
                <a className="nav-link" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Link
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="/">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex">
              {auth ? (
                <div>
                  <Link to="/dashboard">
                    <button
                      className="btn btn-outline-light me-2"
                      type="button"
                    >
                      Dashboard
                    </button>
                  </Link>
                  <button
                    className="btn btn-outline-light"
                    type="button"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    className="btn btn-outline-light me-2"
                    type="button"
                    onClick={handleDashboard}
                  >
                    Dashboard
                  </button>
                  <Link to="/login">
                    <button className="btn btn-outline-light" type="button">
                      Login
                    </button>
                  </Link>
                </div>
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
