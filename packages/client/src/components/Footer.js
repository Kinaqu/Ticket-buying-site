import React from "react";

function Footer() {
  const footerStyle = {
    backgroundColor: "red",
    color: "#ffffff",
    padding: "20px",
    textAlign: "center",
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
    fontSize: "18px",
  };
  

  return (
    <div style={footerStyle}>
      FlyCo
    </div>
  );
}


export default Footer;