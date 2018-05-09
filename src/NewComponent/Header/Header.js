import React from "react";
import Link from "gatsby-link";
import PropTypes from "prop-types";
import IRISAuth from "../../Auth/IRISAuth";
import imgLogo from "../../assets/images/NewDesign/Header/logo.svg";
import config from "../../../build.config.json";
import LoginLogout from "../../components/LoginLogout";

const menuPrimaryIndexes = [0, 1, 18];
const secondaryIndexes = [2, 6, 10, 14];
const primaryIndexes = [0, 1, 3, 4, 5, 7, 8, 9, 11, 12, 13, 15, 16, 17, 18];
var menuClass = "";
var btnClass = "";

//TODO: The same functinal is in the`components/Header`. Make it common for both
function getLoginLogout(auth) {
  const {auth: authVar, env} = config;
  const {login, logout, isAuthenticated} = auth;

  if (authVar === "iris") {
    const href =
      env === "stage"
        ? "https://dev-new-lpma.netlify.com/login-auth0-ailo"
        : "https://new.lpma.com/login-auth0-ailo";

    if (!isAuthenticated()) {
      return (
        <button
          className="button menu-btn"
          onClick={() => {
            window.location.replace(href);
          }}>
          Sign in
        </button>
      );
    }
  }

  return (
    <LoginLogout
      isAuthenticated={isAuthenticated()}
      login={login}
      loginText={"Sign in"}
      logout={logout}
      cssClass={"button menu-btn"}
    />
  );
}

const Header = props => {
  const {pageNumber} = props;

  if (secondaryIndexes.indexOf(pageNumber) !== -1) {
    btnClass = "secondary";
  } else if (primaryIndexes.indexOf(pageNumber) !== -1) {
    btnClass = "";
  }
  if (menuPrimaryIndexes.indexOf(pageNumber) !== -1) {
    menuClass = "";
  } else {
    menuClass = "secondary";
  }

  return (
    <IRISAuth
      render={auth => (
        <nav className={`navbar is-transparent header-wrapper`}>
          <div className="navbar-brand">
            {
              //eslint-disable-next-line
              <a className="navbar-item" onClick={() => props.selectPage("Home")}>
                <img src={imgLogo} alt="this is logo" width="112" height="28" />
              </a>
            }
          </div>
          <div className={`menu ${menuClass}`}>
            <ul>
              <li>
                {
                  //eslint-disable-next-line
                  <a onClick={() => props.selectPage("Home")}>Home</a>
                }
              </li>
              <li>
                <Link to="/pricing">Pricing</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/events">Events</Link>
              </li>
            </ul>
          </div>
          <div className={`navbar-btn-group ${btnClass}`}>
            <div className="navbar-item">
              <Link
                to="/join"
                className="button menu-btn"
                // onClick={() => props.selectPage("Join")}
              >
                JOIN LPMA
              </Link>
            </div>
            {!auth.isAuthenticated() ? (
              <div className="navbar-item">
                {getLoginLogout(auth)
                //eslint-disable-next-line
                  //<a className="button menu-btn" onClick={auth.login}>Sign in</a>
                }
              </div>
            ) : (
              <div className="navbar-item" />
            )}
          </div>
        </nav>
      )}
    />
  );
};
Header.propTypes = {
  selectPage: PropTypes.func,
};
Header.defaultProps = {
  //eslint-disable-next-line
  selectPage: () => console.log("on pricing"),
};
export default Header;
