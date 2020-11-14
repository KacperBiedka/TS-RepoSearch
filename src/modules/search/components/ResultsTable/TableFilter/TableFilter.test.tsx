import React from 'react';
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../../../../test/testUtils";
import TableFilter from './TableFilter';
import classes from "./TableFilter.module.scss";
import { IFilterProps } from './TableFilter';

const setup = (props:IFilterProps) => {
    return shallow(<TableFilter {...props} />);
}

describe("if the filter is active", () => {
    let wrapper: any;
    beforeEach(() => {
        const defaultProps = {
            filter: {
                name: "Name",
                field: "name",
                order: "asc",
                active: true
            },
            sortData: () => {},
            index: 1
        }
        wrapper = setup(defaultProps);
    });
    test("assigns the active class to the icon", () => {
        const chevron = findByTestAttr(wrapper, "filter-chevron-icon");
        const selectors = chevron.get(0).props.className.split(" ");
        expect(selectors.includes(classes.active)).toBeTruthy();
    });
    test("assigns the right order class", () => {
        const filterCell = findByTestAttr(wrapper, "filter-header-cell");
        const selectors = filterCell.get(0).props.className.split(" ");
        expect(selectors.includes(classes.asc)).toBeTruthy();
    })
});

describe("if the filter is not active", () => {
    let wrapper: any;
    beforeEach(() => {
        const defaultProps = {
            filter: {
                name: "Name",
                field: "name",
                order: "desc",
                active: false
            },
            sortData: () => {},
            index: 1
        }
        wrapper = setup(defaultProps);
    });
    test("does not display the chevron icon", () => {
        const chevron = findByTestAttr(wrapper, 'filter-chevron-icon');
        const selectors = chevron.get(0).props.className.split(" ");
        expect(selectors.includes(classes.active)).toBeFalsy();
    })
    test("assigns the right order class", () => {
        const filterCell = findByTestAttr(wrapper, "filter-header-cell");
        const selectors = filterCell.get(0).props.className.split(" ");
        expect(selectors.includes(classes.desc)).toBeTruthy();
    })
});