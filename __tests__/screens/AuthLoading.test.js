import React from "react";
import AuthLoading from "../../app/screens/AuthLoading";

import renderer from "react-test-renderer";

describe ("AuthLoading", () => {
  it("renders without crashing", () => {
    const rendered = renderer.create(<AuthLoading />).toJSON();
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });
  it('should call navigate', async () => {
    const navigationMock = {navigate: jest.fn()}; 

    let authComponent = renderer.create(<AuthLoading 
        navigation={navigationMock}
      />
    ).getInstance(); 

    authComponent._bootstrapAsync(); 
    await expect(navigationMock.navigate).toHaveBeenCalledTimes(0); 
 
  
  });
});