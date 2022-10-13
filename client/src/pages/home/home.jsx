import React, { useContext } from 'react';

import {UserContext} from '../../context/UserContext' 
console.log('userCon', UserContext);

function Home() {
  const user = useContext(UserContext);
  console.log('user', user);

  return (
    <div>
      home
    </div>
  )
}

export default Home