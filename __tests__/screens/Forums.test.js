import React from "react";
import Forums from "../../app/screens/Forums";

import renderer from "react-test-renderer";

describe ("Forums", () => {
  it("renders without crashing", () => {
    const rendered = renderer.create(<Forums />).toJSON();
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });
});