import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";
import classes from "./TableFilter.module.scss";

interface IFilter {
    field: string,
    name: string,
    order: string,
    active: boolean
}

export interface IFilterProps {
    filter: IFilter,
    sortData: (index: number) => void,
    index: number
}

const TableFilter: FC<IFilterProps> = ({ filter, sortData, index }) => {
  return (
    <th
      data-test="filter-header-cell"
      onClick={() => sortData(index)}
      className={filter.order === "asc" ? classes.asc : classes.desc}
    >
      {filter.name}{" "}
      <FontAwesomeIcon
        data-test="filter-chevron-icon"
        className={
          classes.chevron + " " + (filter.active ? classes.active : "")
        }
        icon={["fas", "chevron-down"]}
      />
    </th>
  );
};

export default TableFilter;
