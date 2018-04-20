import React from 'react'; 
import Enzyme, {shallow} from 'enzyme'; 
import Adapter from 'enzyme-adapter-react-16'; 
Enzyme.configure({adapter: new Adapter()}); 

import {TitledInput} from '../../app/components/TitledInput'; 

import styles from '../../app/components/TitledInput/styles';

describe('rendering', () => {
    let wrapper; 
    let props;
    beforeEach(() => {
        props = {
            label:'input label', 
            placeholder: 'placeholder',value: 'value', 
            onChangeText: jest.fn(),
            secureTextEntry: true 
        }
        wrapper = shallow(<TitledInput {...props} />); 

    });
    it('should render a <View/>', () => {
        expect(wrapper.find('View')).toHaveLength(1);
    }); 
    
    it('should render a label', () => {
        expect(wrapper.find('Text').contains('input label')).toBe(true);
    });
    it('should render <TextInput/>', () => {
        expect(wrapper.find('TextInput')).toHaveLength(1);
    });
    describe('custom entry values', () => {
        let wrapper; 
        let props;
        beforeEach(() => {
            props = {
                label:'input label', 
                placeholder: 'placeholder',
                value: 'value', 
                onChangeText: jest.fn(),
                secureTextEntry: true 
            }
            wrapper = shallow(<TitledInput {...props} />); 

        });
        it('should have its custom TextInput Value', () => {
            expect(wrapper.find('TextInput').prop('value')).toEqual('value');
            
        });
        it('should have its custom placeholder value', () => {
            expect(wrapper.find('TextInput').prop('placeholder')).toEqual('placeholder');
            
        }); 
        it('should have its custom autoCorrect Value', () => {
            expect(wrapper.find('TextInput').prop('autoCorrect')).toEqual(false);
            
        });
        it('should have its custom secureTextEntry', () => {
            expect(wrapper.find('TextInput').prop('secureTextEntry')).toEqual(true);
            
        });
    });

    
    describe('custom styles', () => {
        beforeEach(() => {
            props = {
                label:'input label', 
                placeholder: 'placeholder',
                value: 'value', 
                onChangeText: jest.fn(),
                secureTextEntry: true 
            }
            wrapper = shallow(<TitledInput {...props} />);
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
        <TitledInput/>
    ); 
}); 
*/