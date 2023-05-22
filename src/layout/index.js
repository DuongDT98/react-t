import React from "react";
import Header from "../components/header/Header";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div
        style={{
          width: "100%",
          marginLeft: "0px",
          overflowY: "auto",
        }}
      >
        {children}
      </div>
    </>
  );
};

export default MainLayout;
