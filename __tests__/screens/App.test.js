import React from "react";
import App from "../../App";

import renderer from "react-test-renderer";

afterAll(() => setTimeout(() => process.exit(), 100000));

describe ("App", () => {
  it("renders without crashing", () => {
    const rendered = renderer.create(<App />).toJSON();
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });
});