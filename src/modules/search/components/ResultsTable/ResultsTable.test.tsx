import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../../../test/testUtils";
import ResultsTable from "./ResultsTable";
import repoData from "../../../__test__/mockData/extractedResults";
import { IDisplayDataObject, IFilter } from '../../containers/SearchResults/SearchResultsTypes';

const filters = [
  {
    name: "Name",
    field: "name",
    order: "asc",
    active: true,
  },
  {
    name: "Owner",
    field: "owner",
    order: "asc",
    active: false,
  },
  {
    name: "Stars",
    field: "stars",
    order: "asc",
    active: false,
  },
  {
    name: "Created at",
    field: "created_at",
    order: "asc",
    active: false,
  },
];

interface IResultsTableProps {
    repoData: IDisplayDataObject[] | null,
    filters: IFilter[],
    sortData: (index: number) => void,
    perPage: number,
    rowNumber: number,
    currentPage: number,
    perPageCallback: (value: number) => void,
    paginationNumbers: number[],
    updateCurrentPage: (number: number) => void
}

const defaultProps: IResultsTableProps = {
  repoData: repoData,
  perPage: 30,
  paginationNumbers: [1, 2, 3],
  rowNumber: 30,
  currentPage: 1,
  sortData: () => {},
  filters,
  perPageCallback: () => {},
  updateCurrentPage: () => {}
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<ResultsTable {...setupProps} />);
};

describe("if valid data is provided", () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = setup({ repoData });
  });
  test("displays the results table", () => {
    const table = findByTestAttr(wrapper, "search-results-table");
    expect(table.length).toBe(1);
  });
  test("displays correct number of data entry rows", () => {
    const tableRows = findByTestAttr(wrapper, "results-table-body-row");
    expect(tableRows.length).toBe(30);
  });
  test("does not display the empty results message", () => {
    const message = findByTestAttr(wrapper, "empty-results-message");
    expect(message.length).toBe(0);
  });
});

describe("if there is no data", () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = setup({ repoData: null });
  });
  test("does not display the results table", () => {
    const table = findByTestAttr(wrapper, "search-results-table");
    expect(table.length).toBe(0);
  });
  test("displays the empty results message", () => {
    const message = findByTestAttr(wrapper, "empty-results-message");
    expect(message.length).toBe(1);
  });
});
