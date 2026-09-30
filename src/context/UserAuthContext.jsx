import { createContext, useContext, useEffect, useState } from "react";
import {
  addParticipant,
  clearSession,
  ensureDemoUsers,
  getSessionUserId,
  getUsers,
  saveUsers,
  setSession,
} from "../helper/localData";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
  const [profileLoading, setProfileLoading] = useState(true);

  function logIn(email, password) {
    return new Promise((resolve, reject) => {
      const users = getUsers();
      const found = users.find((u) => u.email === email);
      if (!found || found.password !== password) {
        reject(new Error("Invalid email or password"));
        return;
      }
      setSession(found.id);
      setUser({ uid: found.id, email: found.email });
      setUserProfile(found);
      setProfileLoading(false);
      resolve(found);
    });
  }

  function signUp(profile) {
    return new Promise((resolve, reject) => {
      const users = getUsers();
      const exists = users.some((u) => u.email === profile.email);
      if (exists) {
        reject(new Error("Email already exists"));
        return;
      }
      const newUser = {
        id: `user-${Date.now()}`,
        ...profile,
      };
      const updated = [...users, newUser];
      saveUsers(updated);
      setSession(newUser.id);
      setUser({ uid: newUser.id, email: newUser.email });
      setUserProfile(newUser);
      setProfileLoading(false);
      resolve(newUser);
    });
  }

  function logOut() {
    clearSession();
    setUser(null);
    setUserProfile(null);
    setProfilePhotoUrl("");
    return Promise.resolve();
  }

  function forgotPassword() {
    return Promise.resolve();
  }

  function updateProfile(updates) {
    const users = getUsers();
    const updated = users.map((u) =>
      u.id === user?.uid ? { ...u, ...updates } : u,
    );
    saveUsers(updated);
    const current = updated.find((u) => u.id === user?.uid) || null;
    setUserProfile(current);
  }

  useEffect(() => {
    ensureDemoUsers();
    const sessionId = getSessionUserId();
    if (!sessionId) {
      setProfileLoading(false);
      return;
    }
    const users = getUsers();
    const current = users.find((u) => u.id === sessionId) || null;
    if (current) {
      setUser({ uid: current.id, email: current.email });
      setUserProfile(current);
    }
    setProfileLoading(false);
  }, []);

  useEffect(() => {
    const role = userProfile?.role;
    if (role === "admin") {
      setProfilePhotoUrl(`${process.env.PUBLIC_URL}/assets/admin.svg`);
    } else if (role === "user") {
      setProfilePhotoUrl(`${process.env.PUBLIC_URL}/assets/user.svg`);
    } else {
      setProfilePhotoUrl(`${process.env.PUBLIC_URL}/assets/user.svg`);
    }
  }, [userProfile?.role]);

  return (
    <userAuthContext.Provider
      value={{
        user,
        userProfile,
        profilePhotoUrl,
        profileLoading,
        logIn,
        signUp,
        logOut,
        forgotPassword,
        updateProfile,
        addParticipant,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
