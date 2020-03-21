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
import App, { AppContext, AppProps } from "next/app";
import React, { useEffect } from "react";
import { Cookies, CookiesProvider, useCookies } from "react-cookie";
import { client } from "../apollo";
import { useMeQuery } from "../apollo/generated";
import Link from "next/link";

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
  const { data, loading } = useMeQuery({ skip: !token });
  const classes = useStyles();

  if (loading) {
    return <div>Loading...</div>;
  }

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

type Props = {
  cookiesRaw: String;
} & AppProps;

const MyApp = ({ Component, pageProps, cookiesRaw }: Props) => {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <CookiesProvider cookies={new Cookies(cookiesRaw)}>
      <ApolloProvider client={client}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ApolloProvider>
    </CookiesProvider>
  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  const { pageProps } = await App.getInitialProps(appContext);

  // TODO: need fetch me

  return {
    cookiesRaw: appContext.ctx.req?.headers?.cookie,
    pageProps
  };
};

export default MyApp;
