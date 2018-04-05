import React from 'react';
import GymStats from './../app/screens/GymStats';

import renderer from 'react-test-renderer';

it('GymStats renders without crashing', () => {
  const rendered = renderer.create(<GymStats />).toJSON();
  expect(rendered).toBeTruthy();
});