import { ApolloProvider } from "@apollo/client";
import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { AppProps } from "next/app";
import React from "react";
import { CookiesProvider } from "react-cookie";
import { client } from "../apollo";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const App = ({ Component, pageProps }: AppProps) => {
  const classes = useStyles();

  return (
    <CookiesProvider>
      <ApolloProvider client={client}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <Component {...pageProps} />
      </ApolloProvider>
    </CookiesProvider>
  );
};

export default App;
