import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import storageService from '../utils/localStorageHelpers';
import Dashboard from './Dashboard';

const Routes = ({
  contacts,
  setContacts,
  user,
  setUser,
  search,
  setSearch,
  options,
  handleOptionAddition,
  notify,
  isLoading,
  isDarkMode,
}) => {
  return (
    <Switch>
      <Route exact path="/">
        {storageService.loadUser() || user ? (
          <>
            <Dashboard 
            contacts = {contacts}
            setContacts ={setContacts}
            search ={search}
            setSearch ={setSearch}
            options ={options}
            notify={notify}
            handleOptionAddition ={handleOptionAddition}
            isLoading={isLoading}
            isDarkMode={isDarkMode}
            />
          </>
        ) : (
          <Redirect to="login" />
        )}
      </Route>
      <Route exact path="/register">
        <RegisterForm
          setUser={setUser}
          notify={notify}
          isDarkMode={isDarkMode}
        />
      </Route>
      <Route exact path="/login">
        <LoginForm setUser={setUser} notify={notify} isDarkMode={isDarkMode} />
      </Route>
    </Switch>
  );
};

export default Routes;
