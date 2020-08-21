import React from 'react'
// uses jest by default
import { configure, shallow } from 'enzyme';
// shallow => renders the component but not deeply rendered
import Adapter from 'enzyme-adapter-react-16'
import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

configure({adapter: new Adapter()})

// 2nd parameter is the the testing function
describe('<NavigationItems />',()=>{

    let wrapper;

    // helper method
    beforeEach(()=>{
        wrapper = shallow(<NavigationItems />)
    })

    // it() allows 1 test and takes 2 arguments,
    //  the 2nd argument = testing logic
    it('should render two <NavigationItem /> elements if not authenticated', ()=>{
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })
    
    it('should render three <NavigationItem /> elements if authenticated', ()=>{
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    })

    it('should render an exact logout button', ()=>{
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    })

});