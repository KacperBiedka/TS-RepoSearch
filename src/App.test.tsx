import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
test('renders the App component', () => {
  const component = shallow(<App />);
  expect(component).toMatchSnapshot();
});