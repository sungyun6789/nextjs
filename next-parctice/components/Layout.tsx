import React from "react";
import Nav from "./Nav";

const Layout = ({ children }: any) => {
  return (
    <>
      <Nav />
      <div>{children}</div>
    </>
  );
};

export default Layout;
