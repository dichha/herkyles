import React from "react";
import RecOptions from "../../app/screens/RecOptions";

import renderer from "react-test-renderer";

describe ("RecOptions", () => {
  it("renders without crashing", () => {
    const rendered = renderer.create(<RecOptions />).toJSON();
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });
});