import React from 'react'; 
import Enzyme, {shallow} from 'enzyme'; 
import Adapter from 'enzyme-adapter-react-16'; 
Enzyme.configure({adapter: new Adapter()}); 

import {EquipInput} from '../../app/components/EquipInput'; 

import styles from '../../app/components/EquipInput/styles';

describe('rendering', () => {
    let wrapper; 
    let props;
    beforeEach(() => {
        props = {
            label:'Enter Quantity', 
            placeholder: 'placeholder',
            value: 'value', 
            onChangeText: jest.fn(),
            keyboardType: 'numeric'
           
        }
        wrapper = shallow(<EquipInput {...props} />); 

    });
    it('should render a <View/>', () => {
        expect(wrapper.find('View')).toHaveLength(1);
    }); 
    
    it('should render a label', () => {
        expect(wrapper.find('Text').contains('Enter Quantity')).toBe(true);
    });
    it('should render <TextInput/>', () => {
        expect(wrapper.find('TextInput')).toHaveLength(1);
    });
    describe('custom entry values', () => {
        let wrapper; 
        let props;
        beforeEach(() => {
            props = {
                label:'Enter Quantity', 
                placeholder: 'placeholder',
                value: 'value', 
                onChangeText: jest.fn(),
            }
            wrapper = shallow(<EquipInput {...props} />); 

        });
        it('should have its custom TextInput Value', () => {
            expect(wrapper.find('TextInput').prop('value')).toEqual('value');
            
        });
        it('should have its custom placeholder value', () => {
            expect(wrapper.find('TextInput').prop('placeholder')).toEqual('placeholder');
            
        }); 
      
        it('should have keyboard type as numeric', () => {
            expect(wrapper.find('TextInput').prop('keyboardType')).toEqual('numeric');
            
        });
    });

    
    describe('custom styles', () => {
        beforeEach(() => {
            props = {
                label:'input label', 
                placeholder: 'placeholder',
                value: 'value', 
                onChangeText: jest.fn(),
            }
            wrapper = shallow(<EquipInput {...props} />);
        });
        
        it('<View/> should have its custom style', () => {
            expect(wrapper.find('View').prop('style')).toEqual(styles.container);
        });
        
        it('<Text/> should have its custom style', () => {
            expect(wrapper.find('Text').prop('style')).toEqual(styles.text);
        });
        it('<TextInput/> should have its custom style', () => {
            expect(wrapper.find('TextInput').prop('style')).toEqual(styles.textInput);
        });  
    }); 
    
});



/*
import renderer from 'react-test-renderer';
it('renders correctly', () => {
    const hello = renderer.create(
        <EquipInput/>
    ); 
}); 
*/