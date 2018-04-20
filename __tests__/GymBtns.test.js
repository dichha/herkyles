import React from 'react'; 
import Enzyme, {shallow} from 'enzyme'; 
import Adapter from 'enzyme-adapter-react-16'; 
Enzyme.configure({adapter: new Adapter()}); 

import {GymBtns} from '../app/components/Buttons/GymBtns'; 

import styles from '../app/components/Buttons/GymBtns/styles';

describe('rendering', () => {
    let wrapper; 
    beforeEach(() => {
        wrapper = shallow(<GymBtns
            image = "Image"
            gym = "Gym"
            WDHours = "WeekDayHours"
            WEHours = "WeekEndHours"
            address = "Address"
            onPressNav = {()=>{}}
            onPressCoords = {()=>{}}
        />); 

    });
    it('should render a <TouchableOpacity/>', () => {
        expect(wrapper.find('TouchableOpacity')).toHaveLength(1);
    }); 
    it('should render a label for the gym', () => {
        expect(wrapper.find('Text').contains('\nGym')).toBe(true);
    });
    it('should render a label for the weekday hours', () => {
        expect(wrapper.find('Text').contains('WeekDayHours')).toBe(true);
    });
    it('should render a label for the weekend hours', () => {
        expect(wrapper.find('Text').contains('WeekEndHours')).toBe(true);
    });
    it('should render a label for the address', () => {
        expect(wrapper.find('Text').contains('\nAddress')).toBe(true);
    });
    it('should render an AutoHeightImage for the image', () => {
        expect(wrapper.find('AutoHeightImage').props('source')).toEqual({uri: Image});
    });
    
    
    
    describe('custom styles', () => {
        beforeEach(() => {
            wrapper = shallow(<GymBtns
                image = "Image"
                gym = "Gym"
                WDHours = "WeekDayHours"
                WEHours = "WeekEndHours"
                address = "Address"
                onPressNav = {()=>{}}
                onPressCoords = {()=>{}}
            />); 
        });
        
        it('should have its custom style', () => {
            expect(wrapper.find('TouchableOpacity').prop('style')).toEqual(styles.button);
        });
        
    }); 
});
/*describe('interaction', () => {
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