import React, { useContext } from 'react';

// import the context and destructure for some reason
import { UserContext } from '../../context/UserContext' 
console.log('userCon', UserContext);

function Home() {
  // get the data from context
  const user = useContext(UserContext);
  console.log('user', user);

  return (
    <div>
      the answer is {user.user.email}
    </div>
  )
}

export default Home