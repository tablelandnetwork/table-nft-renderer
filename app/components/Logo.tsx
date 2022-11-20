import React from 'react';
import { Link } from 'react-router-dom';

function Logo() {

  return (
    <a href="https://console.tableland.xyz" target="_new">
      <img 
        src="./assets/tableland-logo.svg" 
        className='navbar--logo' 
      /> 
    </a>
  );
}

export default Logo;
