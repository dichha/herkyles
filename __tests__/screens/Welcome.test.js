import React from "react";
import Welcome from "../../app/screens/Welcome";
import MockAsyncStorage from 'mock-async-storage';

import renderer from "react-test-renderer";
import { storage } from "firebase";
import {AsyncStorage as aStorage } from 'react-native'; 

const mock = () => {
  const mockImpl = new MockAsyncStorage(); 
  jest.mock('AsyncStorage', () => mockImpl);
}
mock(); 


describe ("Welcome", () => {
  it("renders without crashing", () => {
    const rendered = renderer.create(<Welcome />).toJSON();
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });
  
  it('Mock Async Storage working', async () => {
    await aStorage.setItem('userEmail', 'abc@gmail.com'); 
    const value = await aStorage.getItem('userEmail');
    expect(value).toBe('abc@gmail.com');
  });
  
  it('should call Logout', async () => {
    //let handleLoginPressMock = jest.fn(); 
    //let navigationMock = {navigate: jest.fn()}
    const navigationMock = {navigate: jest.fn()}; 

    let welcomeComponent = renderer.create(<Welcome 
        navigation={navigationMock}
      />
    ).getInstance();
  
    welcomeComponent.handleLogout(); 
    expect(navigationMock.navigate).toHaveBeenCalledTimes(0); 
     

  });
  
  /*
  it('it should call _getUserEmail()', async () => {
    const navigationMock = {navigate: jest.fn()}; 

    let authComponent = renderer.create(<AuthLoading 
        navigation={navigationMock}
      />
    ).getInstance(); 

    authComponent._bootstrapAsync(); 
    await expect(navigationMock.navigate).toHaveBeenCalledTimes(0); 
 
  }); 
  */
});