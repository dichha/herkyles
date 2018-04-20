import React from 'react'; 
import Enzyme, {shallow} from 'enzyme'; 
import Adapter from 'enzyme-adapter-react-16'; 
Enzyme.configure({adapter: new Adapter()}); 

import {Spinner} from '../../app/components/Spinner'; 

import styles from '../../app/components/Spinner/styles';

import renderer from 'react-test-renderer'; 

describe('rendering', () => {
    let wrapper; 
    beforeEach(() => {
        wrapper = shallow(<Spinner/>); 

    });
    it('should render a <View/>', () => {
        expect(wrapper.find('View')).toHaveLength(1);
    }); 
    it('should render a ActivityIndicator with custom style', () => {
        expect(wrapper.find('ActivityIndicator').prop('size')).toEqual('small'); 
        expect(wrapper.find('ActivityIndicator').prop('color')).toEqual('#00ff00');
    });

    
    describe('custom styles', () => {
        beforeEach(() => {
            wrapper = shallow(<Spinner/>);
        });
        
        it('should have its custom style', () => {
            expect(wrapper.find('View').prop('style')).toEqual(styles.horizontal);
        });
        
    }); 
    
    
});
/*
it('renders correctly', () => {
    const hello = renderer.create(
        <Spinner/>
    ); 
});
*/