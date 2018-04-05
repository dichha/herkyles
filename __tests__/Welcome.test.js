import React from 'react';
import Welcome from './../app/screens/Welcome';

import renderer from 'react-test-renderer';

it('Welcome renders without crashing', () => {
  const rendered = renderer.create(<Welcome />).toJSON();
  expect(rendered).toBeTruthy();
});