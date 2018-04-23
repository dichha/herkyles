import React from "react";
import Home from "../../app/screens/Home";
import Enzyme, {shallow} from 'enzyme'; 
import Adapter from 'enzyme-adapter-react-16'; 
Enzyme.configure({adapter: new Adapter()}); 
import renderer from "react-test-renderer";
import { TestScheduler } from "rxjs";

describe ("Home", () => {
  it("renders without crashing", () => {
    const rendered = renderer.create(<Home />).toJSON();
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });
  it('should call navigate on pressing login', () => {
    //let handleLoginPressMock = jest.fn(); 
    //let navigationMock = {navigate: jest.fn()}
    const navigationMock = {navigate: jest.fn()}; 

    let homeComponent = renderer.create(<Home 
        navigation={navigationMock}
      />
    ).getInstance();
  
    homeComponent.handleLoginPress(); 
    expect(navigationMock.navigate).toHaveBeenCalledTimes(1); 
  });
  it('should call navigate on pressing GymStats', () => {
    const navigationMock = {navigate: jest.fn()}; 

    let homeComponent = renderer.create(<Home 
        navigation={navigationMock}
      />
    ).getInstance(); 

    homeComponent.handleGymStatsPress(); 
    expect(navigationMock.navigate).toHaveBeenCalledTimes(1); 
  
  });
  /*
  it("should console.log handle gym stats press", () => {
    handleGymStatsPress = jest.fn(); 
    handleGymStatsPress("handle gym stats press"); 
    expect(handleGymStatsPress.mock.calls[0][0]).toBe("handle gym stats press");
  });
  */
  /*
  it('should navigate onPress button is pressed', () => {
   
    const navigation = {navigate: jest.fn()}; 
    //const spy = jest.spyOn(navigation, 'navigate'); 

    expect(this.props.navigate).toHaveBennCalledTimes(1); 
  })
  */
});




