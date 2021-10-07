// react-test-renderer
import React from 'react';
import { shallow } from 'enzyme';
// import toJSON from 'enzyme-to-json';
import Navbar from '../../components/Navbar';

test('Should render Navbar', () => {
    // const renderer = new ReactShallowRenderer();
    // renderer.render(<Navbar />);
    // expect(renderer.getRenderOutput()).toMatchSnapshot();
    // console.log(renderer.getRenderOutput());
    const wrapper = shallow(<Navbar />);
    expect(wrapper).toMatchSnapshot();


    // expect(wrapper.find('h1').length).toBe(1);
    // expect(wrapper.find('h1').text()).toBe("The collection of my films.");
});