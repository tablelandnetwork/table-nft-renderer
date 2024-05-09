import React from "react";
import CustomConnectButton from "./CustomConnectButton";
import Logo from "./Logo";

function Header(props) {
  return (
    <header>
      <Logo />
      <CustomConnectButton />
    </header>
  );
}
export default Header;
