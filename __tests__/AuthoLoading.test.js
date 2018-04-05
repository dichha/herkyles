import React from 'react';
import AuthLoading from './../app/screens/AuthLoading';

import renderer from 'react-test-renderer';

it('AuthLoading renders without crashing', () => {
  const rendered = renderer.create(<AuthLoading />).toJSON();
  expect(rendered).toBeTruthy();
});