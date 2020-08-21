import React from 'react'
// uses jest by default
import { configure, shallow } from 'enzyme';
// shallow => renders the component but not deeply rendered
import Adapter from 'enzyme-adapter-react-16'
import {BurgerBuilder} from './BurgerBuilder'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'


configure({adapter: new Adapter()})

describe('<BurgerBuilder />',()=>{

    let wrapper;

    // helper method
    beforeEach(()=>{
        wrapper = shallow(<BurgerBuilder onInitIngredients={()=>{}} />)
    })

    it('should render one <BuildControls /> elements if authenticated', ()=>{
        wrapper.setProps({ings:{salad:0}})
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })

});