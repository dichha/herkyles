import React from 'react'; 
import Enzyme, {shallow} from 'enzyme'; 
import Adapter from 'enzyme-adapter-react-16'; 
Enzyme.configure({adapter: new Adapter()}); 

import SuccessStatus from '../../app/components/Status/SuccessStatus'; 

import styles from '../../app/components/Status/styles';

import renderer from 'react-test-renderer'; 
describe('rendering', () => {
    let wrapper; 
    beforeEach(() => {
        wrapper = shallow(<SuccessStatus text= 'error msg' />); 

    });
    it('should render a <View/>', () => {
        expect(wrapper.find('View')).toHaveLength(1);
    }); 
    it('should render a label', () => {
        expect(wrapper.find('Text').contains('error msg')).toBe(true);
    });
    
    describe('custom styles', () => {
        beforeEach(() => {
            wrapper = shallow(<SuccessStatus text="error msg" />);
        });
        
        it('should have its custom style', () => {
            expect(wrapper.find('Text').prop('style')).toEqual(styles.success);
        });
        
    }); 
    
});
/*
it('renders correctly', () => {
    const hello = renderer.create(
        <SuccessStatus/>
    ); 
});
*/