import { auth } from "@/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

import { 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut, 
  User, 
  UserCredential 
} from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type FirebaseAuthContextType = {
  user: User | null;
  register: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<UserCredential>;
  isSignedIn: boolean;
};

const FirebaseAuthContext = createContext<FirebaseAuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(FirebaseAuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a FirebaseAuthProvider");
  }
  return context;
};

export function FirebaseAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const register = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  return (
    <FirebaseAuthContext.Provider value={{ user, register, logout, login, isSignedIn: !!user }}>
      {children}
    </FirebaseAuthContext.Provider>
  );
}

