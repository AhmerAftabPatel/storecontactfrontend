import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import storageService from '../utils/localStorageHelpers';
import { useMediaQuery } from 'react-responsive';
import { Menu, Icon, Dropdown } from 'semantic-ui-react';

const NavBar = ({ user, setUser, isDarkMode, setIsDarkMode }) => {
  const [iconLoading, setIconLoading] = useState(false);
  const location = useLocation();

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const handleLogout = () => {
    setUser(null);
    storageService.logoutUser();
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    setIconLoading(true);
    storageService.saveDarkMode(!isDarkMode);
    setTimeout(() => setIconLoading(false), 2150);
  };

  const logoutMenu = () => {
    return isMobile ? (
      <Dropdown item icon="sidebar">
        <Dropdown.Menu className={isDarkMode ? 'dark-mode-menu' : ''}>
          <Dropdown.Item>
            <Icon name="user" />
            <span>{`Hi, ${user.displayName}`}</span>
          </Dropdown.Item>
          <Dropdown.Item onClick={handleLogout}>
            <Icon name="sign-out" />
            <span>Logout</span>
          </Dropdown.Item>
          <Dropdown.Item onClick={handleDarkModeToggle}>
            <Icon
              name={isDarkMode ? 'moon' : 'sun'}
              color={isDarkMode ? 'purple' : 'yellow'}
            />
            <span>Dark Mode: {isDarkMode ? 'ON' : 'OFF'}</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    ) : (
      <>
        <Menu.Item>
          <Icon name="user" />
          {`Hi, ${user.displayName}`}
        </Menu.Item>
        <Menu.Item style={{borderRadius : "21px",background : "#FF6666",marginRight : "20px"}} name="Logout" onClick={handleLogout} icon="sign-out" />
      </>
    );
  };

  const loginRegisterMenu = () => {
    return isMobile ? (
      <Dropdown item icon="sidebar">
        <Dropdown.Menu className={isDarkMode ? 'dark-mode-menu' : ''}>
          <Dropdown.Item as={Link} to="/register">
            <Icon name="signup" />
            <span>Register</span>
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/login">
            <Icon name="sign-in" />
            <span>Login</span>
          </Dropdown.Item>
          <Dropdown.Item onClick={handleDarkModeToggle}>
            <Icon
              name={isDarkMode ? 'moon' : 'sun'}
              color={isDarkMode ? 'purple' : 'yellow'}
            />
            <span>Dark Mode: {isDarkMode ? 'ON' : 'OFF'}</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    ) : (
      <>
        <Menu.Item
          as={Link}
          name="Register"
          to="/register"
          icon="signup"
          style={{borderRadius : "21px",background : location.pathname === '/register' ? "#22CB5C" : ""}}
        />
        <Menu.Item
          as={Link}
          name="Login"
          to="/login"
          icon="sign-in"
          style={{borderRadius : "21px",background : location.pathname === '/login' ? "#22CB5C" : "", color : "black"}}
        />
      </>
    );
  };

  return (
    <Menu
      borderless={isMobile}
      inverted={isDarkMode}
      size="small"
      // inverted
      secondary
      color="teal"
      className="nav-bar"
    >
      <Menu.Item header className="nav-title">
        <div className="nav-logo">
          <Icon name="font awesome" />
          Contactryy
        </div>
        <small>
          by &nbsp;
          <a
            href="https://iamahmer.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            style={{color : "gold"}}
          >
            The Golden Dev
          </a>
        </small>
      </Menu.Item>
      <Menu.Menu position="right">
        {user ? <>{logoutMenu()}</> : <>{loginRegisterMenu()}</>}
        {/* {!isMobile && (
          <Menu.Item>
            <Icon
              name={isDarkMode ? 'moon' : 'sun'}
              size="large"
              color={isDarkMode ? 'purple' : 'yellow'}
              circular
              loading={iconLoading}
              link
              onClick={handleDarkModeToggle}
            />
          </Menu.Item>
        )} */}
      </Menu.Menu>
    </Menu>
  );
};

export default NavBar;
