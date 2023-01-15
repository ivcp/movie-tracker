import { createContext, useEffect, useState } from 'react';

const UserContext = createContext({
  user: null,
  setUser: () => {},
  loginUser: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedWatchlistUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      // TODO: set token to movies services
    }
  }, []);

  const loginUser = user => {
    setUser(user);
    window.localStorage.setItem('loggedWatchlistUser', JSON.stringify(user));
  };

  return (
    <UserContext.Provider value={{ user, setUser, loginUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
