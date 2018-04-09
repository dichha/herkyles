import React from "react";
import Signup from "./../app/screens/Signup";

import renderer from "react-test-renderer";

describe ("Signup", () => {
  it("renders without crashing", () => {
    const rendered = renderer.create(<Signup />).toJSON();
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });
});