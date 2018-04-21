import React from "react";
import GymStats from "../../app/screens/GymStats";

import renderer from "react-test-renderer";

describe ("GymStats", () => {
  it("renders without crashing", () => {
    const rendered = renderer.create(<GymStats />).toJSON();
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });
});