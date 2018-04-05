import React from 'react';
import Login from './../app/screens/LoginHome';

import renderer from 'react-test-renderer';

it('Login renders without crashing', () => {
  const rendered = renderer.create(<Login />).toJSON();
  expect(rendered).toBeTruthy();
});