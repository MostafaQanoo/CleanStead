import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const ModalLoginContext = createContext();

function ModalLoginProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const contextData = useMemo(
    () => ({ isOpen, setIsOpen, isLogged, setIsLogged }),
    [isOpen, isLogged]
  );

  return (
    <ModalLoginContext.Provider value={contextData}>
      {children}
    </ModalLoginContext.Provider>
  );
}

ModalLoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ModalLoginProvider, ModalLoginContext };
