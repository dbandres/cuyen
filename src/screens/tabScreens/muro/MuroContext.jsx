import React, { createContext, useState } from 'react';

export const MuroContext = createContext();

export const MuroProvider = ({ children }) => {
  const [miDato, setMiDato] = useState(false);

  const actualizarDato = () => {
    setMiDato(!miDato);
  };

  return (
    <MuroContext.Provider value={{ miDato, actualizarDato }}>
      {children}
    </MuroContext.Provider>
  );
};