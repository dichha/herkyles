import React from 'react'; 
import Enzyme, {shallow} from 'enzyme'; 
import Adapter from 'enzyme-adapter-react-16'; 
Enzyme.configure({adapter: new Adapter()}); 

import {LinkBtns} from '../../app/components/Buttons/LinkBtns'; 

import styles from '../../app/components/Buttons/LinkBtns/styles';

describe('rendering', () => {
    let wrapper; 
    beforeEach(() => {
        wrapper = shallow(<LinkBtns text="LinkText" onPress={() => {}}/>); 

    });
    it('should render a <TouchableOpacity/>', () => {
        expect(wrapper.find('TouchableOpacity')).toHaveLength(1);
    }); 
    it('should render a label', () => {
        expect(wrapper.find('Text').contains('LinkText')).toBe(true);
    });
    
    describe('custom styles', () => {
        beforeEach(() => {
            wrapper = shallow(<LinkBtns text="LinkText" onPress={()=>{}} />);
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
        wrapper = shallow(<LinkBtns {...props} />);
    });
    describe('pressing the button', () => {
        beforeEach(() => {
            wrapper.find('TouchableOpacity').prop('onPress')();
        });
        it('should call the onPress callback', () => {
            console.log(props.onPress); 
            expect(props.onPress).toHaveBeenCalledTimes(1);
        });

    });
});


/*
import renderer from 'react-test-renderer'; 

it('renders correctly', () => {
    const hello = renderer.create(
        <LinkBtns/>
    ); 
}); 
*/