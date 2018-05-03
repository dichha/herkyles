import React from 'react'; 
import Enzyme, {shallow} from 'enzyme'; 
import Adapter from 'enzyme-adapter-react-16'; 
Enzyme.configure({adapter: new Adapter()}); 

import {LinkTouch} from '../../app/components/Buttons/LinkTouch'; 

import styles from '../../app/components/Buttons/LinkTouch/styles';

describe('rendering', () => {
    let wrapper; 
    beforeEach(() => {
        wrapper = shallow(<LinkTouch text="LinkText" onPress={() => {}}/>); 

    });
    it('should render a <TouchableOpacity/>', () => {
        expect(wrapper.find('TouchableOpacity')).toHaveLength(1);
    }); 
    it('should render a label', () => {
        expect(wrapper.find('Text').contains('LinkText')).toBe(true);
    });
    
    describe('custom styles', () => {
        beforeEach(() => {
            wrapper = shallow(<LinkTouch text="LinkText" onPress={()=>{}} />);
        });
        
        it('should have its custom style', () => {
            expect(wrapper.find('TouchableOpacity').prop('style')).toEqual(styles.container);
        });
        
    }); 
});
describe('interaction', () => {
    let wrapper; 
    let props; 
    beforeEach(() => {
        props = {text: 'LinkText', onPress: jest.fn()},
        wrapper = shallow(<LinkTouch {...props} />);
    });
    describe('pressing the button', () => {
        beforeEach(() => {
            wrapper.find('TouchableOpacity').prop('onPress')();
        });
        it('should call the onPress callback', () => {
            expect(props.onPress).toHaveBeenCalledTimes(1);
        });
    });
});


/*
import renderer from 'react-test-renderer'; 

it('renders correctly', () => {
    const hello = renderer.create(
        <LinkTouch/>
    ); 
}); 
*/