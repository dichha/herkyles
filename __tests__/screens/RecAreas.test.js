import React from "react";
import RecAreas from "../../app/screens/RecAreas";
import Enzyme, {shallow} from 'enzyme'; 
import Adapter from 'enzyme-adapter-react-16'; 
Enzyme.configure({adapter: new Adapter()}); 

import renderer from "react-test-renderer";

describe ("RecAreas", () => {
  
  it("renders without crashing", () => {
    const navigationMock = {state: jest.fn()};

    const rendered = renderer.create(<RecAreas navigation={navigationMock} parmas={params}/>).toJSON();
    
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });
  /*
  const wrapper = shallow(<RecAreas/>)
  console.log(wrapper.state());
  */
});