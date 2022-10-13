import React from 'react'
import { createContext, useContext, useEffect, useState } from 'react';

export const UserContext = React.createContext()
// const LoggedInUser = createContext()
// const useUserContext = () => useContext(UserContext)
// const useLoggedInUser = () => useContext(LoggedInUser);

const LoggedInUserProvider = ({ children }) => {
    const [user, setUser] = useState({
        email: 'email@email.com'
    });

    return (
        <UserContext.Provider value={{ user }}>
          {children}
        </UserContext.Provider>
      );
}


export default LoggedInUserProvider