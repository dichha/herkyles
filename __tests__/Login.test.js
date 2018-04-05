import React from 'react';
import Login from './../app/screens/Login';

import renderer from 'react-test-renderer';

describe ('Login', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(<Login />).toJSON();
    expect(rendered).toBeTruthy();
  });
});