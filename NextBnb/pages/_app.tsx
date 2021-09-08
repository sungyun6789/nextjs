import App, { AppContext, AppProps } from 'next/app';
import GlobalStyle from '../styles/GlobalStyle';
import React from 'react';
import Header from '../components/Header';

import { wrapper } from '../store';
import { cookieStringToObject } from '../lib/utils';

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

app.getInitialProps = async (context: AppContext) => {
  const appInitialProps = await App.getInitialProps(context);
  const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
  console.log(cookieObject);
  return { ...appInitialProps };
};
