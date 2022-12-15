import React from 'react';
import CustomConnectButton from './CustomConnectButton';
import Logo from './Logo';
function Header(props) {
    return (React.createElement("header", null,
        React.createElement(Logo, null),
        React.createElement(CustomConnectButton, null)));
}
export default Header;
