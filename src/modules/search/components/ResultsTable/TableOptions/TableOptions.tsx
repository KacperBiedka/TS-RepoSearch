import React, { FC } from "react";
import Input from "../../../../../components/Input/Input";
import classes from "./TableOptions.module.scss";

// Potentially this compoennt could contain more options related to the table content

interface IOptionsProps {
    perPage: number,
    updateCallback: (value: any) => void
}

const TableOptions: FC<IOptionsProps> = ({ perPage, updateCallback }) => {
  return (
    <div className={classes.perPageInputWrapper}>
      <label htmlFor="perPage-input">Entries per page</label>
      <Input
        data-test="perPage-input"
        value={perPage}
        changeCallback={(value) => updateCallback(value)}
        id="perPage-input"
        type="number"
      />
    </div>
  );
};

export default TableOptions;
