import React from 'react';
import Home from './../app/screens/Home';

import renderer from 'react-test-renderer';

describe ('Home', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(<Home />).toJSON();
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });
});