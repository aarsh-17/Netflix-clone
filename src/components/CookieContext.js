// CookieContext.js
import React, { createContext, useContext } from 'react';
import { useCookies } from 'react-cookie';

const CookieContext = createContext();

export const CookieProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies();
  return (
    <CookieContext.Provider value={{ cookies, setCookie, removeCookie }}>
      {children}
    </CookieContext.Provider>
  );
};

export const useCookieContext = () => useContext(CookieContext);
