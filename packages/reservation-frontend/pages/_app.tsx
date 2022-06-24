import './styles.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, css } from '@emotion/react';
import theme from '../lib/theme';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apollo-client';
import tw from 'twin.macro';

function CustomApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState, {
    token: pageProps.user?.token,
  });
  return (
    <>
      <Head>
        <title>Welcome to reservation-frontend!</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <main className="app">
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </ApolloProvider>
      </main>
    </>
  );
}

export default CustomApp;
