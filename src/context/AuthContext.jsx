import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);

  // Check if userRole is stored in localStorage or from a token
  useEffect(() => {
    const role = localStorage.getItem("userRole"); // Assuming you store role in localStorage
    if (role) {
      setUserRole(role);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
