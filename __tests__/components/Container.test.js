import React from 'react'; 
import Enzyme, {shallow} from 'enzyme'; 
import Adapter from 'enzyme-adapter-react-16'; 
Enzyme.configure({adapter: new Adapter()}); 

import {Container} from '../../app/components/Container'; 

import styles from '../../app/components/Container/styles'; 

describe('rendering', () => {
    let wrapper; 
    beforeEach(() => {
        wrapper = shallow(<Container onPress={() => {}}/>);
    });
    it('should render a <TouchableWithoutFeedback/>', () => {
        expect(wrapper.find('TouchableWithoutFeedback')).toHaveLength(1);
    });
    describe('custom styles', () => {
        beforeEach(() => {
            wrapper = shallow(<Container onPress={()=>{}} />); 
        }); 
        it('should have its custom style', () => {
            expect(wrapper.find('TouchableWithoutFeedback').prop('style')).toEqual(styles.container)
        })
    })
}); 
describe('interaction', () => {
    let wrapper; 
    let props; 
    beforeEach(() => {
        props = {onPress: jest.fn()},
        wrapper = shallow(<Container {...props} />);
    });
    describe('pressing the button', () => {
        beforeEach(() => {
            wrapper.find('TouchableWithoutFeedback').prop('onPress')();
        });
        
        it('should call the onPress callback', () => {
            expect(props.onPress).toHaveBeenCalledTimes(0);
        });
        
    });
});