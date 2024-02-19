import { createContext, useContext, useEffect, useState } from 'react';
import { login, logout, onUserStateChange } from '../auth/firebaseAuth';

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChange((user) => {
      console.log(user);
      setUser(user);
    });
  }, []);

  return <AuthContext.Provider value={{ user, uid: user && user.uid, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
