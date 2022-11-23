import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

function Error(props) {

  
  const error= useSelector((store: RootState) => store.error);

  if(!error) return null;

  return (
    <div className="error">{`${error}`}</div>
  );
}
export default Error;
