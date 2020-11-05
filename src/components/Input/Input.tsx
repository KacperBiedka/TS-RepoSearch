import React, { FC } from 'react';
import classes from './Input.module.scss';

export interface IInputProps {
    value: string | number,
    changeCallback: (value: string | number) => {}
}

const Input: FC<IInputProps> = ({ value, changeCallback, ...options}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeCallback(e.target.value);
    };
  return (
    <input
    className={classes.input}
    type="text"
    value={value}
    onChange={handleChange}
    {...options}
  />
  );
}

export default Input;
