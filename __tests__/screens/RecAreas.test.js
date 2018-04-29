import React from "react";
import RecAreas from "../../app/screens/RecAreas";

import renderer from "react-test-renderer";

describe ("RecAreas", () => {
  it("renders without crashing", () => {
    const rendered = renderer.create(<RecAreas />).toJSON();
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });
});