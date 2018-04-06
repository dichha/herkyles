import React from 'react';
import AuthLoading from './../app/screens/AuthLoading';

import renderer from 'react-test-renderer';

describe ('AuthLoading', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(<AuthLoading />).toJSON();
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });
});