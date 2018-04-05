import React from 'react';
import HerkNav from './../app/screens/HerkNav';

import renderer from 'react-test-renderer';

it('HerkNav renders without crashing', () => {
  const rendered = renderer.create(<HerkNav />).toJSON();
  expect(rendered).toBeTruthy();
});