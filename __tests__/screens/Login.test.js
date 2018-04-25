import React from "react";
import Login from "../../app/screens/Login";

import renderer from "react-test-renderer";
import * as firebase from '../../db/DbConfig';

describe ("Login", () => {
  it("renders without crashing", () => {
    const rendered = renderer.create(<Login />).toJSON();
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });
  it('should call navigate on pressing Signup', () => {
    //let handleLoginPressMock = jest.fn(); 
    //let navigationMock = {navigate: jest.fn()}
    const navigationMock = {navigate: jest.fn()}; 

    let loginComponent = renderer.create(<Home 
        navigation={navigationMock}
      />
    ).getInstance();
  
    loginComponent.handleSignupPress(); 
    expect(navigationMock.navigate).toHaveBeenCalledTimes(1); 
  });
  
});