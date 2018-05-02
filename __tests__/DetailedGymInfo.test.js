import React from "react";
import DetailedGymInfo from "./../app/screens/DetailedGymInfo";

import renderer from "react-test-renderer";

describe ("DetailedGymInfo", () => {
  it("renders without crashing", () => {
    const rendered = renderer.create(<DetailedGymInfo />).toJSON();
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });
});