import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';



function Error(props) {

  
  const {error, typeOfQuery} = useSelector((store: RootState) => store);
  
  if(typeOfQuery==="write") {
    return <div className='message'>
      To modify a table, please visit https://console.tableland.xyz 
    </div>
  }

  if(!error) return null;

  return (
    <div className="error">{`${error}`}</div>
  );
}
export default Error;
