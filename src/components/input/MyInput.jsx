// MyInput.jsx
import React from 'react';
import classes from './MyInput.module.css';

const MyInput = (props) => {
  const handleInputChange = (event) => {
    const sanitizedValue = event.target.value.replace(/[^a-zA-Z0-9 ]/g, '');
    props.onChange({ ...event, target: { ...event.target, value: sanitizedValue } });
  };

  return <input className={classes.myInput} {...props} onChange={handleInputChange} />;
};

export default MyInput;
