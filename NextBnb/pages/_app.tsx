import { AppProps } from 'next/app';
import GlobalStyle from '../styles/GlobalStyle';
import React from 'react';
import Header from '../components/Header';

import { wrapper } from '../store';

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      <div id="root-modal" />
    </>
  );
};

export default wrapper.withRedux(app);
