import React, { FC } from "react";
import classes from "./TablePagination.module.scss";
import { v4 as uuid } from "uuid";

export interface IPaginationProps {
    paginationNumbers: number[],
    updateCurrentPage: (number: number) => void,
    currentPage: number 
}

const TablePagination: FC<IPaginationProps> = ({
  paginationNumbers,
  updateCurrentPage,
  currentPage,
}) => {
  return (
    <div className={classes.tablePagination}>
      {paginationNumbers.map((number) => {
        return (
          <p
            data-test="pagination-paragraph"
            onClick={() => updateCurrentPage(number)}
            key={uuid()}
            className={
              classes.paginationNumber +
              " " +
              (number === currentPage ? classes.active : null)
            }
          >
            {number}
          </p>
        );
      })}
    </div>
  );
};

export default TablePagination;
