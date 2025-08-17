import React, { createContext, useState } from "react";

export const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    all_approved_carder: "",
    all_existing_carder: "",
    all_vacancies: "",
    // other fields...
  });

  const [carderRows, setCarderRows] = useState([]);

  return (
    <ApplicationContext.Provider value={{ formData, setFormData, carderRows, setCarderRows }}>
      {children}
    </ApplicationContext.Provider>
  );
};
