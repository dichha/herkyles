import React from 'react';
import HerkNav from './../app/screens/HerkNav';

import renderer from 'react-test-renderer';

describe ('HerkNav', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(<HerkNav />).toJSON();
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });
});