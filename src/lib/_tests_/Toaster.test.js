import React from 'react';
import { shallow } from 'enzyme';
import Toaster from '../components/Toaster';

describe('Toaster Component', () => {
  it('Should render without errors', () => {
    const component = shallow(<Toaster />);
    expect(component.length).toBe(1);
  });
});
