import React from 'react';
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../../../../test/testUtils";
import TablePagination, { IPaginationProps } from './TablePagination';
import classes from "./TablePagination.module.scss";

const defaultProps: IPaginationProps = {
    paginationNumbers: [1, 2, 3, 4, 5],
    currentPage: 3,
    updateCurrentPage: () => {}
}

const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<TablePagination {...setupProps} />);
};

test("displays correct number of pagination paragraphs", () => {
    const wrapper = setup();
    const paragraphs = findByTestAttr(wrapper, "pagination-paragraph");
    expect(paragraphs.length).toBe(defaultProps.paginationNumbers.length);
});

test("assigns the active class to the proper paragraph", () => {
    const wrapper = setup();
    const paragraphs = findByTestAttr(wrapper, "pagination-paragraph");
    const selectors = paragraphs.get(defaultProps.currentPage - 1).props.className.split(" ");
    expect(selectors.includes(classes.active)).toBeTruthy();
});