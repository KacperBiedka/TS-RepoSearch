import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../../../test/testUtils";
import StatusHero from "./StatusHero";
import classes from "./StatusHero.module.scss";
import * as mockReactRedux from 'react-redux';

const defaultProps = {
  value: "tonik",
};

const defaultSearchError = "empty search parameter";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux") as typeof mockReactRedux,
  useSelector: jest.fn()
}));

const setup = (state = {}, props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  mockReactRedux.useSelector.mockImplementation((callback: (state: {}) => void) => {
    return callback(state);
  });
  return shallow(<StatusHero {...setupProps} />);
};

describe("if no error is present", () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = setup({
      searchReducer: {
        searchError: null,
      },
    });
  });
  test("assigns the correct success class to the headline", () => {
    const hero = findByTestAttr(wrapper, "status-hero");
    const selectors = hero.get(0).props.className.split(" ");
    expect(selectors.includes(classes.success)).toBeTruthy();
    expect(selectors.includes(classes.error)).toBeFalsy();
  });
  test("displays the search value inside of the hero tag", () => {
    const hero = findByTestAttr(wrapper, "status-hero");
    const innerWords = hero.get(0).props.children.split(" ");
    expect(innerWords.includes(defaultProps.value)).toBeTruthy();
  });
});

describe("if there is an error", () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = setup({
      searchReducer: {
        searchError: defaultSearchError,
      },
    });
  });
  test("assigns the correct success class to the headline", () => {
    const hero = findByTestAttr(wrapper, "status-hero");
    const selectors = hero.get(0).props.className.split(" ");
    expect(selectors.includes(classes.success)).toBeFalsy();
    expect(selectors.includes(classes.error)).toBeTruthy();
  });
  test("displays the error message inside of the hero tag", () => {
    const hero = findByTestAttr(wrapper, "status-hero");
    const innerWords = hero.get(0).props.children;
    expect(innerWords).toEqual(defaultSearchError);
  });
});
