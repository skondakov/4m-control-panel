import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Layout from './components/Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './config/routes';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { type AuthUser } from "aws-amplify/auth";
import { type UseAuthenticator } from "@aws-amplify/ui-react-core";

type AppProps = {
  signOut?: UseAuthenticator["signOut"]; //() => void;
  user?: AuthUser;
};

const App: React.FC<AppProps> = ({ signOut, user }) => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout signOut={signOut}>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default withAuthenticator(App, {hideSignUp: true});
