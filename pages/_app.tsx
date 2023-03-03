import React, { useState, useEffect } from 'react';
import '@styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { DarkTheme, LightTheme } from '@theme/theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from '@components/Layout';
import Head from 'next/head';
import { AnimatePresence } from 'framer-motion';
import { ThemeContext } from '@lib/ThemeContext';
import store from 'redux/store';
import TransactionModal from '@components/Modal/TransactionModal';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [theme, setTheme] = useState(DarkTheme);

  useEffect(() => {
    setTheme(localStorage.getItem('darkToggle') === 'dark' ? DarkTheme : LightTheme);
  }, []);

  return (
    <Provider store={store}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=yes" />
      </Head>
      <ThemeProvider theme={theme}>
        <ThemeContext.Provider value={{ theme, setTheme } as any}>
          <CssBaseline enableColorScheme />
          <AnimatePresence exitBeforeEnter>
            <Layout>
              <TransactionModal />
              <Component {...pageProps} />
            </Layout>
          </AnimatePresence>
        </ThemeContext.Provider>
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
