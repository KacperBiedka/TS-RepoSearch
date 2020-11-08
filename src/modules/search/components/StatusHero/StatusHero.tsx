import React, { FC } from "react";
import classes from "./StatusHero.module.scss";
import { useSelector } from 'react-redux';
import { stateType } from '../../../../reducers/searchReducer';

interface IStatusHeroProps {
    value: string
}

interface ISelectorState {
    searchReducer: stateType
}

const StatusHero: FC<IStatusHeroProps> = ({ value }) => {
    const searchError = useSelector((state: ISelectorState) => {
    return state.searchReducer.searchError;
  });
  return (
    <h1
      data-test="status-hero"
      className={
        classes.hero +
        " " +
        (searchError ? classes.error : value ? classes.success : "")
      }
    >
      {searchError
        ? searchError
        : value
        ? `Search results for: ${value}`
        : "Search for anything :)"}
    </h1>
  );
};

export default StatusHero;
