import { useState } from "react";

export const useFormInput = (initialState:any) => {
    const [values, setValues] = useState(initialState);
  
    const handleInputChange = (e:any) => {
      const { name, value } = e.target;
      setValues((prevValues:any) => ({
        ...prevValues,
        [name]: value,
      }));
    };
  
    return { handleInputChange };
  };