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
  /*
  it('should navigate onPress button is pressed', () => {
   
    const navigation = {navigate: jest.fn()}; 
    //const spy = jest.spyOn(navigation, 'navigate'); 

    expect(this.props.navigate).toHaveBennCalledTimes(1); 
  })
  */
});




