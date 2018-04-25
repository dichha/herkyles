import React from "react";
import Signup from "../../app/screens/Signup";

import renderer from "react-test-renderer";
import * as firebase from '../../db/DbConfig'
describe ("Signup", () => {
  it("renders without crashing", () => {
    const rendered = renderer.create(<Signup />).toJSON();
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });
  
});
/*
describe('handleSubmit', () => {
  beforeAll(() => {
    firebase.firebase.auth = jest.fn().mockReturnValue({

    })
  })

});
*/