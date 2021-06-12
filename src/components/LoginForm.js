import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FormError from './FormError';
import DemoCredsInfo from './DemoCredsInfo';
import contactService from '../services/contacts';
import authService from '../services/auth';
import storageService from '../utils/localStorageHelpers';
import { useMediaQuery } from 'react-responsive';
import { Segment, Form, Button, Header, Container,Image } from 'semantic-ui-react';
import imageUrl from "./assets/landing.jpg"

const LoginForm = ({ setUser, notify, isDarkMode }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const history = useHistory();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { email, password } = credentials;

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const user = await authService.login(credentials);
      setUser(user);
      contactService.setToken(user.token);
      storageService.saveUser(user);
      setIsLoading(false);
      setError(null);

      notify(`Welcome ${user.displayName}, you're logged in!`, {
        appearance: 'success',
      });
      history.push('/');
    } catch (err) {
      setIsLoading(false);
      const errRes = err?.response?.data;

      if (errRes?.error) {
        return setError({ message: errRes.error });
      } else {
        return setError({ message: err.message });
      }
    }
  };

  return (
    <Segment
    basic
    style ={{paddingLeft : "14em"}}
      className={
        isDarkMode ? 'login-reg-card login-form dark-mode-segment' : 'login-reg-card login-from'
      }
      inverted={isDarkMode}
      textAlign="center"
    >
      <Image size="medium" style={{marginLeft : window.innerWidth > 800 ? "210px" : ""}} src={imageUrl}></Image>
      <Header as={isMobile ? 'h3' : 'h2'} textAlign="center">
        Login to your account
      </Header>
      <Container style = {{width : "400px"}}>
      <Form
        onSubmit={handleLogin}
        className={isDarkMode ? 'dark-mode-auth-form auth-form' : 'auth-form'}
      >
        
        <Form.Input
          required
          placeholder="For ex. abc@example.com"
          label="Email"
          type="email"
          name="email"
          value={email}
          
          onChange={handleOnChange}
          icon="at"
          iconPosition="left"
        />
        <Form.Input
          required
          placeholder="Password must have minimum characters of 6."
          label="Password"
          type={showPass ? 'text' : 'password'}
          name="password"
          value={password}
          onChange={handleOnChange}
          icon="lock"
          iconPosition="left"
          action={
            password !== '' && {
              icon: showPass ? 'eye slash' : 'eye',
              onClick: () => setShowPass(!showPass),
            }
          }
        />

        <Button
          // animated="vertical"
          style = {{color:"black",width : "150px",background : "#22CB5C",borderRadius : "21px",textAlign : "center"}}
          // labelPosition="left"
          type="submit"
          loading={isLoading}
          size={isMobile ? 'small' : 'large'}
          fluid={isMobile}
        >
          Login
        </Button>
        <Header
          as="h4"
          textAlign={isMobile ? 'center' : 'left'}
          className="login-reg-bottom-text"
        >
          Don't have an account? <Link to="/register">Register.</Link>
        </Header>
      </Form>
      <DemoCredsInfo />
      </Container>
      {error && (
        <FormError
          message={error.message}
          title={error.title}
          positive={error.positive}
          setError={setError}
        />
      )}
      
    </Segment>
  );
};

export default LoginForm;
