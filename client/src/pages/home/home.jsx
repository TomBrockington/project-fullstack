import React, { useContext } from 'react';

import { UserContext } from '../../context/UserContext' 
console.log('userCon', UserContext);

function Home() {
  const user = useContext(UserContext);
  console.log('user', user);

  return (
    <div>
      the answer is {user.user.email}
    </div>
  )
}

export default Home