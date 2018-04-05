import React from 'react';
import Home from './../app/screens/Home';

import renderer from 'react-test-renderer';

it('Home renders without crashing', () => {
  const rendered = renderer.create(<Home />).toJSON();
  expect(rendered).toBeTruthy();
});