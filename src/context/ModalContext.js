import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModalContext = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

  const toggleModal = () => {
    setModal((prevModal) => !prevModal);
    setForceUpdate((prev) => prev + 1);
  };

  const contextValue = {
    modal,
    toggleModal,
    forceUpdate,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};
