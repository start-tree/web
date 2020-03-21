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
import Link from "next/link";
import React, { useEffect } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import { client } from "../apollo";
import { useMeQuery } from "../apollo/generated";

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

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [{ token }] = useCookies(["token"]);
  const { data } = useMeQuery({
    skip: !token
  });
  const classes = useStyles();

  return (
    <div>
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
          {data && data.me ? (
            <Button color="inherit">Logout</Button>
          ) : (
            <Button color="inherit">
              <Link as="/login" href="/login">
                <a>Login</a>
              </Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <CookiesProvider>
      <ApolloProvider client={client}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ApolloProvider>
    </CookiesProvider>
  );
};

export default MyApp;
