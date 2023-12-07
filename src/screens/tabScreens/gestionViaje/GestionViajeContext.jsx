import React, { createContext, useState } from 'react';

export const GestioViajeContext = createContext();

export const GestionViajeProvider = ({ children }) => {
  const [miDato, setMiDato] = useState("");

  const actualizarDato = (data) => {
    setMiDato(data);
  };

  return (
    <GestioViajeContext.Provider value={{ miDato, actualizarDato }}>
      {children}
    </GestioViajeContext.Provider>
  );
};