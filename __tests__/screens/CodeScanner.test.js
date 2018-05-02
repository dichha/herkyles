import React from "react";
import CodeScanner from "../../app/screens/CodeScanner";

import renderer from "react-test-renderer";

describe ("Code Scanner", () => {
  it("renders without crashing", () => {
    const rendered = renderer.create(<CodeScanner />).toJSON();
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });
});