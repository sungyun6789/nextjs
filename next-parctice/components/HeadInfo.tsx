import Head from "next/head";
import React from "react";

const HeadInfo = ({ title, contents }: any) => {
  return (
    <Head>
      <title>{title}</title>
      <meta />
      <meta content={contents} />
    </Head>
  );
};

HeadInfo.defaultProps = {
  title: "My Blog",
  contents: "My Blog contents",
};

export default HeadInfo;
