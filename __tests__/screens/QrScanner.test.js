import React from "react";
import QrScanner from "./../app/screens/QrScanner";

import renderer from "react-test-renderer";

describe ("QR Scanner", () => {
  it("renders without crashing", () => {
    const rendered = renderer.create(<QrScanner />).toJSON();
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });
});