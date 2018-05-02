import React from 'react'; 
import Enzyme, {shallow} from 'enzyme'; 
import Adapter from 'enzyme-adapter-react-16'; 
Enzyme.configure({adapter: new Adapter()}); 

import {ListItemRecAreas} from '../../app/components/List'; 

import styles from '../../app/components/List/styles';

describe('rendering', () => {
    let wrapper; 
    let props;
    const ICON_PREFIX = 'ios';
    beforeEach(() => {
        props = {
            item: jest.fn(),
            onLongPress:jest.fn(),
            onLongPress:jest.fn(),
            
           
        }
        wrapper = shallow(<ListItemRecAreas {...props} />); 

    });
    it('should render a <TouchableHighlight/>', () => {
        expect(wrapper.find('TouchableHighlight')).toHaveLength(1);
    }); 
    it('should render a <View/>', () => {
        expect(wrapper.find('View')).toHaveLength(1);
    });
    
});



/*
import renderer from 'react-test-renderer';
it('renders correctly', () => {
    const hello = renderer.create(
        <ListItemRecAreas/>
    ); 
}); 
*/